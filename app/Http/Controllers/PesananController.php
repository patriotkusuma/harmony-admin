<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use App\Http\Requests\Pesanan\StorePesananRequest;
use App\Http\Requests\Pesanan\UpdatePesananRequest;
use App\Models\CategoryPaket;
use App\Models\Customer;
use App\Models\DetailPesanan;
use App\Models\JenisCuci;
use App\Models\Outlet;
use App\Models\Pembayaran;
use Carbon\Carbon;
use Inertia\Inertia;

use Cookie;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\Printer;
use Rawilk\Printing\Facades\Printing;
use Rawilk\Printing\Receipts\ReceiptPrinter;

use App\Traits\WaSender;
use Illuminate\Support\Facades\Cache;

class PesananController extends Controller
{
    use WaSender;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {


        $searchData = $request->query('searchData');
        $pakets = JenisCuci::with('categoryPaket')->where('nama', 'LIKE', '%'.$searchData . '%')->get();
        $pesanans = Pesanan::all();
        $cartItems = \Cart::getContent();
        $subTotal = \Cart::getSubTotal() != "" ? round(\Cart::getSubTotal()) : '';

        $harga = ($subTotal/1000);
        $whole = floor($harga);
        $totalHarga = $harga - $whole;

        if($totalHarga < 0.4){
            $totalHarga = round($harga, 0, PHP_ROUND_HALF_DOWN);
        }else if($totalHarga > 0.7) {
            $totalHarga = round($harga, 0, PHP_ROUND_HALF_UP);
        }else {
            $totalHarga = $whole + 0.5;
        }

        $subTotal=$totalHarga * 1000;

        // $subTotal = $subTotal != '' ? (round($subTotal/1000,)) : '';

        $estimasiSelesai = Carbon::now()->addDay(1)->toDateTimeString();

        if ($cartItems != null) {
            $cartAttributes = [];


            foreach ($cartItems as $key => $value) {
                if ($value->attributes->has('tanggal_selesai')) {
                    $cartAttributes[] = (int)$value->attributes->tanggal_selesai;
                }
            }

            // dd(date('Y-m-d H:i:s',max($cartAttributes)));
            $estimasiSelesai = $cartAttributes != null ? date('Y-m-d H:i:s',max($cartAttributes)) : Carbon::now()->addDay(1)->toDateString();
        }


        // $categoryPakets = CategoryPaket::with('paketCuci')->get();
        $categoryPakets = CategoryPaket::whereHas('paketCuci', function ($query) use ($searchData){
            $query->where('nama', 'like', '%'.$searchData.'%');
        })->with(['paketCuci' => function($query) use ($searchData){
            $query->where('nama', 'like', '%'.$searchData.'%');
        }])->orderBy('id')->get();


        return Inertia::render('Harmony/Pesanan/Index', compact(
            'pesanans',
            'pakets',
            'cartItems',
            'subTotal',
            'categoryPakets',
            'estimasiSelesai',
            'searchData'
        ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePesananRequest $request)
    {
        // dd(Carbon::now()->format("H:i, d M Y"));
        $cartItems = \Cart::getContent();
        $subTotal = \Cart::getSubTotal() != "" ? round(\Cart::getSubTotal()) : '';


        $harga = ($subTotal/1000);
        $whole = floor($harga);
        $totalHarga = $harga - $whole;

        if($totalHarga < 0.4){
            $totalHarga = round($harga, 0, PHP_ROUND_HALF_DOWN);
        }else if($totalHarga > 0.7) {
            $totalHarga = round($harga, 0, PHP_ROUND_HALF_UP);
        }else {
            $totalHarga = $whole + 0.5;
        }

        $subTotal=$totalHarga * 1000;

        // dd($subTotal);

        $estimasiSelesai = Carbon::now()->addDay(1)->toDateTimeString();

        if ($cartItems != null) {
            $cartAttributes = [];


            foreach ($cartItems as $key => $value) {
                if ($value->attributes->has('tanggal_selesai')) {
                    $cartAttributes[] = $value->attributes->tanggal_selesai;
                }
            }

            $estimasiSelesai = $cartAttributes != null ? date('Y-m-d H:i:s',max($cartAttributes)) : Carbon::now()->addDay(1)->toDateTimeString();
        }

        // Customer
        $customers = new Customer();
        $customers->nama = $request->nama != null ? $request->nama : '';
        $customers->telpon = $request->telpon != null ? $request->telpon : '';
        $customers->save();

        // Pesanan
        $pesanan = new Pesanan();
        $pesanan->id_pelanggan = $customers->id;
        $pesanan -> id_pegawai = auth()->user()->id;
        $pesanan->kode_pesan = $request->kodePesan;
        $pesanan->total_harga = $subTotal;
        $pesanan->tanggal_pesan = Carbon::now()->toDateString();
        $pesanan->tanggal_selesai = $estimasiSelesai;
        $pesanan->status_pembayaran = $request->statusPembayaran;
        $pesanan->save();

        // Detail Pesanan
        foreach ($cartItems as $key => $value) {
            $jenisCuci = JenisCuci::find($value->id);
            $detailPesanan = new DetailPesanan();
            $detailPesanan ->id_pesanan = $pesanan->id;
            $detailPesanan -> id_jenis_cuci = $jenisCuci->id;
            $detailPesanan -> qty = ($value->quantity / 1000);
            $detailPesanan ->harga = $jenisCuci->harga;
            $detailPesanan ->total_harga = ($value->quantity * $value->price);
            $detailPesanan->save();
        }

        // $pembayaran = new Pembayaran();
        // $pembayaran->id_pesanan = $pesanan->kode_pesan;
        // $pembayaran->id_pelanggan = $customers->id;
        // $pembayaran->total_pembayaran = $pesanan->total_harga;
        // $pembayaran->nominal_bayar = 0;
        // $pembayaran->kembalian = 0;
        // $pembayaran->status = $request->statusPembayaran;
        // $pembayaran->save();

        // $pesanan

        // $pesanan->status = ""
        // $pesanan->id_pegawai = Auth::user()->id;




        $connector = new WindowsPrintConnector('pos-58c');
        // $connector = new WindowsPrintConnector('Receipt Printer');
        $printer = new Printer($connector);

        // Print 1
        $printer -> initialize();
        $printer -> setJustification(Printer::JUSTIFY_CENTER);
        $printer -> text("Harmony Laundry\n");
        $printer -> text("Jln. Candi Gebang\n");
        $printer -> text("telp / wa : 08363324517\n");
        $printer -> feed(2);
        $printer -> setJustification(Printer::JUSTIFY_LEFT);
        $printer -> text("Tanggal : " . Carbon::now()->format("H:i, d M Y") . "\n");
        $printer -> text("Selesai : " . Carbon::parse($estimasiSelesai)->format("H:i, d M Y") . "\n");
        $printer -> text("No : " . $request->kodePesan . "\n");
        $printer -> text("Nama : " . $request->nama . " \n");
        $printer -> text("No Wa : " . $request->telpon . " \n");
        $printer->setJustification(Printer::JUSTIFY_CENTER);
        $printer->text("--------------------------------\n");
        $printer -> feed(1);
        // $printer ->
        // $printer -> qrCode($request->kodePesan);

        foreach ($cartItems as $key => $value) {
            // $jenisCuci = JenisCuci::find($value->id);
            // $printer -> text($this->columnify($value->name, "Rp ". $jenisCuci->harga, 22, 10, 2));
            // $printer -> text($this->columnify("    ".$value->quantity . " gram", "Rp " . ($value->quantity * $value -> price), 22, 10, 0));

            $printer->setJustification(Printer::JUSTIFY_LEFT);
            $jenisCuci = JenisCuci::find($value->id);
            $printer->text($jenisCuci->categoryPaket->nama . "\n");
            $printer -> text($value->name . "\n");
            $printer->setJustification(Printer::JUSTIFY_RIGHT);
            $isKg = $value->quantity < 1000 ? "pcs" : "kg";
            $qty = $value->quantity < 1000 ? $value->quantity : ($value->quantity / 1000);
            $line = sprintf('%5.2f %3s  x  %8.0f %8.0f', $qty, $isKg ,$jenisCuci->harga, ($value->quantity * $value->price));
            $printer->text($line . "\n");
        }

        $printer->feed(1);
        $printer->setJustification(Printer::JUSTIFY_CENTER);
        $printer->text("--------------------------------\n");
        $printer->setJustification(Printer::JUSTIFY_RIGHT);
        $printer->text("Total : " . "Rp " . number_format($subTotal, 0,',','.'));
        // $printer->text($this->columnify("Total : ", "Rp ". $subTotal, 22, 10, 2));
        // $printer -> text();
        $printer->feed(2);
        $printer->setEmphasis(true);
        $printer->selectPrintMode(Printer::MODE_DOUBLE_HEIGHT);
        $printer->selectPrintMode(Printer::MODE_DOUBLE_WIDTH);
        $printer->setJustification(Printer::JUSTIFY_LEFT);
        $printer->text($request->statusPembayaran);
        $printer->feed(2);
        $printer->setJustification(Printer::JUSTIFY_CENTER);
        $printer->text("Selesai \n");
        $printer->text(Carbon::parse($estimasiSelesai)->format("d M Y"));
        $printer->selectPrintMode(Printer::MODE_FONT_A);
        $printer->setEmphasis(false);
        $printer->feed(2);
        $printer->setJustification(Printer::JUSTIFY_CENTER);
        $printer->text("Terima Kasih\n");
        $printer->text("Jangan lupa kembali lagi.\n");
        $printer->feed(8);
        // $printer -> cut();
        $printer->close();


        // Print 2

        // $printer -> initialize();
        // $printer -> setJustification(Printer::JUSTIFY_CENTER);
        // $printer -> text("Harmony Laundry\n");
        // $printer -> text("Jln. Candi Gebang\n");
        // $printer -> text("telp / wa : 08363324517\n");
        // $printer -> feed(2);
        // $printer -> setJustification(Printer::JUSTIFY_LEFT);/*  */
        // $printer -> text("Tanggal : " . Carbon::now()->format("H:i, d M Y") . "\n");
        // $printer -> text("Selesai : " . Carbon::parse($estimasiSelesai)->format("d M Y") . "\n");
        // $printer -> text("No : " . $request->kodePesan . "\n");
        // $printer -> text("Nama : " . $request->nama . " \n");
        // $printer -> text("No Wa : " . $request->telpon . " \n");
        // $printer->selectPrintMode(Printer::MODE_DOUBLE_HEIGHT);
        // $printer->selectPrintMode(Printer::MODE_EMPHASIZED);
        // $printer->text("Pembayaran : " . $request->statusPembayaran . "\n");
        // $printer->selectPrintMode(Printer::MODE_FONT_A);
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer->text("--------------------------------\n");
        // $printer -> feed(1);
        // // $printer ->
        // // $printer -> qrCode($request->kodePesan);

        // foreach ($cartItems as $key => $value) {
        //     // $jenisCuci = JenisCuci::find($value->id);
        //     // $printer -> text($this->columnify($value->name, "Rp ". $jenisCuci->harga, 22, 10, 2));
        //     // $printer -> text($this->columnify("    ".$value->quantity . " gram", "Rp " . ($value->quantity * $value -> price), 22, 10, 0));

        //     $printer->setJustification(Printer::JUSTIFY_LEFT);
        //     $jenisCuci = JenisCuci::find($value->id);
        //     $printer->text($jenisCuci->categoryPaket->nama . "\n");
        //     $printer -> text($value->name . "\n");
        //     $printer->setJustification(Printer::JUSTIFY_RIGHT);
        //     $isKg = $value->quantity < 1000 ? "pcs" : "kg";
        //     $qty = $value->quantity < 1000 ? $value->quantity : ($value->quantity / 1000);
        //     $line = sprintf('%5.2f %3s  x  %8.0f %8.0f', $qty, $isKg ,$jenisCuci->harga, ($value->quantity * $value->price));
        //     $printer->text($line . "\n");
        // }

        // $printer->feed(1);
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer->text("--------------------------------\n");
        // $printer->setJustification(Printer::JUSTIFY_RIGHT);
        // $printer->text("Total : " . "Rp " . $subTotal);
        // // $printer->text($this->columnify("Total : ", "Rp ". $subTotal, 22, 10, 2));
        // // $printer -> text();
        // $printer->feed(2);
        // $printer->setEmphasis(true);
        // $printer->selectPrintMode(Printer::MODE_DOUBLE_HEIGHT);
        // $printer->selectPrintMode(Printer::MODE_DOUBLE_WIDTH);
        // // $printer->setJustification(Printer::JUSTIFY_LEFT);
        // // $printer->text($request->statusPembayaran);
        // // $printer->feed(2);
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer->text($request->nama != "" ? $request->nama : $request->telpon);
        // $printer->selectPrintMode(Printer::MODE_FONT_A);
        // $printer->setEmphasis(false);
        // $printer->feed(2);
        // $printer->setJustification(Printer::JUSTIFY_LEFT);
        // $printer->text("# Kumpulkan 10 nota \n");
        // $printer->text("# Dapatkan gratis cuci 1 kali\n");
        // $printer->text("# (max 8 kg)");
        // $printer->feed(2);
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer->text("Terima Kasih\n");
        // $printer->text("Jangan lupa kembali lagi.\n");
        // $printer->feed(2);
        // // $printer -> cut();
        // $printer->close();

        \Cart::clear();

        return back()->with('success', 'pesanan berhasil dibuat!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pesanan $pesanan)
    {
        $pesanan = $pesanan->load('customer', 'detailPesanan', 'detailPakaian');
        $detailPesanans = DetailPesanan::with('jenisCuci.categoryPaket')->where('id_pesanan', $pesanan->id)->get();
        return Inertia::render('Harmony/DaftarPesanan/Show', compact(
            'pesanan',
            'detailPesanans'
        ));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pesanan $pesanan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePesananRequest $request, Pesanan $pesanan)
    {
        // dd($request);
        $status = $request->query('status');
        // $statusPembayaran = $pesanan->status_pembayaran == "Lunas" ? "Lunas" : ;


        // if($status == 'selesai'){
        //     $phone = $pesanan->customer->telpon;
        //     if($phone != ""){
        //         $arrayNama = explode(" ",strtolower($pesanan->customer->nama));
        //         $panggilan = null;
        //         if($arrayNama[0] == "bu" || $arrayNama[0] == "pak"){
        //             $panggilan = "";
        //         }else{$panggilan = "kak";}

        //         $message = "Hallo ".$panggilan." *". $pesanan->customer->nama . "*,\n\n";
        //         if($pesanan->antar == 1){

        //             $message.= "Laundrymu sudah selesai, apakah bisa kami antar sekarang ?\n";
        //         }else {
        //             $message .= "Laundrymu sudah selesai dan bisa segera diambil. \n";
        //         }

        //         $message .= "Terima kasih sudah menggunakan layanan laundry kami.🙏\n";
        //         $message .= "\n\n";
        //         $message .= "Harmony Laundry";


        //         $this->notify($message, $phone);
        //     }
        // }

        if($pesanan->status_pembayaran == "Belum Lunas" && $status == "diambil"){
            $pesanan->update([
                'status' => $status,
                // 'status_pembayaran' => "Lunas",
                'notify_selesai' => 1,
                'notify_pesan' => 1,
                'tanggal_ambil' => Carbon::now()->toDateString(),
            ]);
        }else{
            $pesanan->update([
                'status' => $status,
                'tanggal_ambil' => Carbon::now()->toDateTimeString()
            ]);
        }

        return back()->with('success', 'Pesana berhasil diambil');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pesanan $pesanan)
    {
        //
    }

    public function pesananAll(Request $request)
    {
        $cacheData = Cache::get(auth()->user()->id . '-activeOutlet');
        $idOutlet = $cacheData !== NULL ? $cacheData['id_outlet'] :'';
        if(!$idOutlet){

            if(auth()->user()->role == 'admin' || auth()->user()->role == 'owner'){
                $outlet = Outlet::latest()->first();
                $idOutlet = $outlet->id;
            }else{
                $idOutlet = auth()->user()->pegawai->onOutlet !== NULL ? auth()->user()->pegawai->onOutlet->id_outlet : '';
            }
        }
        $dateFrom = $request->query('dateFrom');
        $dateTo = $request->query('dateTo');

        $pesanans = Pesanan::select('id')
            ->where('id_outlet', $idOutlet)
            ->where('status','!=','batal');
        $todayGet = Pesanan::where('tanggal_pesan', 'LIKE' , '%' . Carbon::now()->toDateString() . '%')
            ->where('id_outlet', $idOutlet)
            ->sum('total_harga');
        $todayKilo = DetailPesanan::where('qty', '>=', '1')
                    ->whereIn('id_pesanan', $pesanans)
                    ->where('created_at', 'LIKE', '%'. Carbon::now()->toDateString() . '%')
                    ->sum('qty');

        // dd($todayKilo);
        $firstOfMonth = isset($dateFrom) ? $dateFrom : Carbon::now()->firstOfMonth()->toDateString();
        $lastOfMonth = isset($dateTo) ? $dateTo : Carbon::now()->lastOfMonth()->toDateString();
        $bulanIni = Pesanan::whereBetween('tanggal_pesan', [ $firstOfMonth, $lastOfMonth])
                    ->where('id_outlet', $idOutlet)
                    ->where('status', '!=','batal')
                    ->sum('total_harga');
        $monthKilo = DetailPesanan::where('qty', '>', 1)
                        ->whereIn('id_pesanan', $pesanans)
                        ->whereBetween('created_at', [$firstOfMonth, $lastOfMonth])->sum('qty');



        $monthKilo = number_format($monthKilo, 2, ',' ,'.');
        // dd($monthKilo);

        $searchData = $request->query('searchData');
        $rowPerPage = $request->query('rowPerPage');
        if($rowPerPage == null){
            $rowPerPage = 10;
        }

        // $riwayatPesanans = Pesanan::whereHas('customer', function($query) use ($searchData){
        //     $query->where('nama', 'like', '%'. $searchData . '%');
        // });
        $riwayatPesanans = Pesanan::with('customer', 'detailPesanan.jenisCuci');

        if($dateFrom != null){
            $riwayatPesanans = $riwayatPesanans->whereBetween('tanggal_pesan', [ carbon::parse($dateFrom)->toDateString(),
                ($dateTo != null ? Carbon::parse($dateTo)->toDateString() : Carbon::now()->toDateString())]);
        }
        $riwayatPesanans = $riwayatPesanans->when(
            $searchData,
            fn ($query) =>
            $query->where('kode_pesan', 'like', '%' . $searchData . '%')
                ->orWhere('status', 'like', '%' . $searchData . '%')
                // ->orWhere('customer.nama', 'like', '%' . $searchData . '%')
                ->orWhere('status_pembayaran', 'like', '%' . $searchData . '%')
                ->orWhere('total_harga', 'like', '%' . $searchData . '%')
                ->orWhereHas('customer', function($qry) use ($searchData){
                    $qry->where('nama', 'like', '%' . $searchData . '%');
                })
        );

        $riwayatPesanans = $riwayatPesanans->where('id_outlet', $idOutlet);
        $riwayatPesanans = $riwayatPesanans->latest()->paginate($rowPerPage)->withQueryString();
        // dd($riwayatPesanans);
        return Inertia::render('Harmony/DaftarPesanan/Index', compact(
            'riwayatPesanans',
            'todayGet',
            'bulanIni',
            'todayKilo',
            'monthKilo'
        ));
    }

    public function print(Pesanan $pesanan)
    {
        $pesanan = $pesanan->load('customer');
        $pesanan = $pesanan->load('detailPesanan');


        $harga = ($pesanan->total_harga/1000);
        $whole = floor($harga);
        $totalHarga = $harga - $whole;

        if($totalHarga < 0.4){
            $totalHarga = round($harga, 0, PHP_ROUND_HALF_DOWN);
        }else if($totalHarga > 0.7) {
            $totalHarga = round($harga, 0, PHP_ROUND_HALF_UP);
        }else {
            $totalHarga = $whole + 0.5;
        }

        $totalHarga = $totalHarga * 1000;
        // dd($pesanan);

        $connector = new WindowsPrintConnector('pos-58c');
        $printer = new Printer($connector);

        $printer -> initialize();
        $printer -> setJustification(Printer::JUSTIFY_CENTER);
        $printer -> text("Harmony Laundry\n");
        $printer -> text("Jln. Candi Gebang\n");
        $printer -> text("telp / wa : 08363324517\n");
        $printer -> feed(2);
        $printer -> setJustification(Printer::JUSTIFY_LEFT);
        $printer -> text("Tanggal : " . Carbon::parse($pesanan->tanggal_pesan)->format("H:i, d M Y") . "\n");
        $printer -> text("Selesai : " . Carbon::parse($pesanan->tanggal_selesai)->format("d M Y") . "\n");
        $printer -> text("No : " . $pesanan->kode_pesan . "\n");
        $printer -> text("Nama : " . $pesanan->customer->nama . " \n");
        $printer -> text("No Wa : " . $pesanan->customer->telpon . " \n");
        $printer->selectPrintMode(Printer::MODE_EMPHASIZED);
        $printer->selectPrintMode(Printer::MODE_DOUBLE_HEIGHT);
        $printer->text("Pembayaran : " . $pesanan->status_pembayaran . "\n");
        $printer->selectPrintMode(Printer::MODE_FONT_A);
        $printer->setJustification(Printer::JUSTIFY_CENTER);
        $printer->text("--------------------------------\n");
        $printer -> feed(1);


        foreach ($pesanan->detailPesanan as $key => $value) {
            $jenisCuci = JenisCuci::find($value->id);

            // $printer -> text($this->columnify($value->jenisCuci->nama, "Rp ". $value->jenisCuci->harga, 22, 10, 2));
            $printer->setJustification(Printer::JUSTIFY_LEFT);
            $printer->text($value->jenisCuci->categoryPaket->nama . "\n");
            $printer -> text($value->jenisCuci->nama . "\n");
            $printer->setJustification(Printer::JUSTIFY_RIGHT);

            $isKg = "";
            switch ($value->jenisCuci->tipe) {
                case 'per_kilo':
                    $isKg='kg';
                    break;

                case 'satuan':
                    $isKg = 'pcs';
                    break;

                default:
                    $isKg = 'meter';
                    break;
            }

            // $isKg = $value->jenisCuci->tipe == "per_kilo" ? "pcs" : "kg";
            $qty = $value->qty < 1 ? ($value->qty * 1000) : $value->qty;
            $line = sprintf('%5.2f %3s  x  %8.0f %8.0f', $qty, $isKg ,$value->harga, $value->total_harga);
            $printer->text($line . "\n");
            // $printer -> text($this->columnify("    ".($value->qty * 1000) . " gram", "Rp " . ($value->total_harga), 22, 10, 0));
        }

        $printer->feed(1);
        $printer->setJustification(Printer::JUSTIFY_CENTER);
        $printer->text("--------------------------------\n");
        $printer->setJustification(Printer::JUSTIFY_RIGHT);
        $printer->text("Total : " . "Rp " . number_format($totalHarga,0,',','.'));
        $printer->feed(2);
        $printer->setEmphasis(true);
        // $printer->selectPrintMode(Printer::MODE_DOUBLE_HEIGHT);
        // $printer->selectPrintMode(Printer::MODE_DOUBLE_WIDTH);
        $printer -> setTextSize(2,2);
        $printer->setJustification(Printer::JUSTIFY_CENTER);
        $printer->text($pesanan->customer->nama. "\n");
        // $printer->feed(2);
        // $printer->qrCode("https://harmonylaundry.my.id/pesanan/".$pesanan->kode_pesan, Printer::QR_ECLEVEL_L, 6);
        $printer->selectPrintMode(Printer::MODE_FONT_A);
        $printer->setEmphasis(false);
        $printer->feed(2);
        $printer->setJustification(Printer::JUSTIFY_LEFT);
        $printer->text("# Kumpulkan 10 nota \n");
        $printer->text("# Dapatkan gratis cuci 1 kali\n");
        $printer->text("# (max 8 kg)");
        $printer->feed(2);
        $printer->setJustification(Printer::JUSTIFY_CENTER);
        $printer->text("Terima Kasih\n");
        $printer->text("Jangan lupa kembali lagi.\n");
        $printer->feed(8);
        // $printer -> cut();
        $printer->close();
    }

    function columnify($leftCol, $rightCol, $leftWidth, $rightWidth, $space = 4)
    {
        $leftWrapped = wordwrap($leftCol, $leftWidth, "\n", true);
        $rightWrapped = wordwrap($rightCol, $rightWidth, "\n", true);

        $leftLines = explode("\n", $leftWrapped);
        $rightLines = explode("\n", $rightWrapped);
        $allLines = array();
        for ($i= 0 ; $i < max(count($leftLines), count($rightLines)); $i++)
        {
            $leftPart = str_pad(isset($leftLines[$i]) ? $leftLines[$i] : "", $leftWidth, " ");
            $rightPart = str_pad(isset($rightLines[$i]) ? $rightLines[$i] : "", $rightWidth, " ");
            $allLines[] = $leftPart . str_repeat(" ", $space) . $rightPart;
        }

        return implode("\n", $allLines);
    }

    // function createBookingId()
    // {
    //     $bookingId = "HRMN" . '-'. Carbon::now()->timestamp . '-'. rand(10000, 99999);

    //     Cookie::queue('booking_id', $bookingId, 120);

    //     return $bookingId;
    // }
}
