<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseController as BaseController;
use App\Http\Requests\Pesanan\StorePesananRequest;
use App\Http\Resources\PesananResource;
use App\Models\Customer;
use App\Models\DetailPesanan;
use App\Models\JenisCuci;
use App\Models\Pembayaran;
use App\Models\Pesanan;
use App\Models\User;
use App\Traits\WaSender;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Validator;

class PesananController extends BaseController
{
    use WaSender;
    private $pesanan;

    public function __construct()
    {
        $this->pesanan = Pesanan::with('customer','detailPesanan.jenisCuci.categoryPaket');
    }
    public function index(Request $request){
        $idOutlet = $this->checkActiveOutlet();
        $dateFrom = $request->query('dateFrom') == null ? Carbon::now()->firstOfYear() : $request->query('dateFrom');
        $dateTo = $request->query('dateTo') == null ? Carbon::now()->endOfYear() : $request->query('dateTo');
        $rowPerPage = $request->query('rowPerPage') ? $request->query('rowPerPage') : 5;
        $searchData = $request->query('searchData');
        $status = $request->query('status');


        $pesanan = $this->pesanan->when(
            $status,
            fn($query)=> $query->where('status', $status)
        );
        $pesanan = $this->pesanan->whereBetween('tanggal_pesan',[$dateFrom, $dateTo]);
        $pesanan = $this->pesanan->when(
            $searchData,
            fn($query) =>
            $query->where('kode_pesan', 'like', '%' . $searchData . '%')
                // ->orWhere('status', 'like', '%' . $searchData . '%')
                // ->orWhere('customer.nama', 'like', '%' . $searchData . '%')
                ->orWhere('status_pembayaran', 'like', '%' . $searchData . '%')
                ->orWhere('total_harga', 'like', '%' . $searchData . '%')
                ->orWhereHas('customer', function($qry) use ($searchData){
                    $qry->where('nama', 'like', '%' . $searchData . '%')
                    ->orWhere('telpon', 'like', "%{$searchData}%");
            })
        );

        $pesanan = $this->pesanan->where('id_outlet', $idOutlet)->latest()->paginate($rowPerPage);

        // $pesanan =  PesananResource::collection($pesanan);
        // $this->sendResponse($pesanan, 200);
        return response()->json([
            'data' => $pesanan,
            'message' => 'Semua Data',
            'success'   => true
        ],200);

    }

    public function store(StorePesananRequest $request)
    {
        // dd($request);
        $userId = auth()->user()->id;
        // dd(auth()->user()->pegawai->onOutlet->id_outlet);
        // $idOutlet = auth()->user()->pegawai->onOutlet->id_outlet ? auth()->user()->pegawai->onOutlet->id_outlet : '';
        $idOutlet = $this->checkActiveOutlet();
        $cartSession = \Cart::session($userId);
        $cartItems = $cartSession->getContent();
        $subTotal = $cartSession->getSubTotal() != "" ? round($cartSession->getSubTotal()) : '';

        $harga = ($subTotal / 1000);
        $whole = floor($harga);
        $totalHarga = $harga- $whole;

        switch ($totalHarga) {
            case $totalHarga < 0.4:
                $totalHarga = round($harga, 0, PHP_ROUND_HALF_DOWN);
                break;

            case $totalHarga > 0.7:
                $totalHarga = round($harga, 0, PHP_ROUND_HALF_UP);
                break;

            default:
                $totalHarga = $whole + 0.5;
                break;
        }

        $subTotal = $totalHarga * 1000;

        $estimasiSelesai = Carbon::now()->addDay(1)->toDateTimeString();
        $antarJemput = 0;

        if ($cartItems != null) {
            $cartAttributes = [];


            foreach ($cartItems as $key => $value) {
                if ($value->attributes->has('tanggal_selesai')) {
                    if($value->id == "224"){
                        $antarJemput = 1;
                        continue;
                    }
                    $cartAttributes[] = $value->attributes->tanggal_selesai;
                }
            }

            $estimasiSelesai = $cartAttributes != null ?
                date('Y-m-d H:i:s',min($cartAttributes)) : Carbon::now()->addDay(1)->toDateTimeString();
        }

        $customer = [];
        if($request->id_pelanggan == null){

            // Customer
            $customer = new Customer();
            $customer->nama = $request->nama != null ? $request->nama : '';
            $customer->telpon = $request->telpon != null ? $request->telpon : '';
            $customer->save();
        }else{
            $customer = Customer::find($request->id_pelanggan);
        }


        // dd($request);
        // Pesanan
        $bayarReq = $request->totalBayar;
        $pesanan = new Pesanan();
        $pesanan->id_pelanggan = $customer->id;
        $pesanan->id_pegawai = $userId;
        $pesanan->kode_pesan = "HRMN-". Carbon::now()->timestamp;
        $pesanan->total_harga = $subTotal;
        $pesanan->tanggal_pesan = Carbon::now()->toDateTimeString();
        $pesanan->tanggal_selesai = $estimasiSelesai;
        $pesanan->status_pembayaran = $bayarReq < $subTotal ? "Belum Lunas" : "Lunas";
        $pesanan->id_outlet = $idOutlet;
        $pesanan->paid = $bayarReq ? $bayarReq : 0;
        $pesanan->antar = $antarJemput;
        $pesanan->save();

        if($request->totalBayar != 0){
            $pembayaran = new Pembayaran();
            $pembayaran->id_pesanan = $pesanan->id;
            $pembayaran->id_pelanggan= $customer->id;
            $pembayaran->total_pembayaran = $pesanan->total_harga;
            $pembayaran->nominal_bayar = $request->totalBayar;
            $pembayaran->kembalian = ($pesanan->totalBayar - $request->total_harga);
            $pembayaran->status = $request->statusPembayaran;
            $pembayaran->save();
        }


        // DetailPesanan
        foreach ($cartItems as $key => $value) {
            $jenisCuci = JenisCuci::find($value->id);
            $detailPesanan = new DetailPesanan();
            $detailPesanan->id_pesanan = $pesanan->id;
            $detailPesanan->id_jenis_cuci = $jenisCuci->id;
            $detailPesanan->qty = ($value->quantity / 1000);
            $detailPesanan->harga = $jenisCuci->harga;
            $detailPesanan->total_harga = ($value->quantity * $value->price);
            $detailPesanan->save();
        }

        $cartSession->clear();

        $pesananForPrint = Pesanan::with('customer','detailPesanan.jenisCuci.categoryPaket')->where('kode_pesan',$pesanan->kode_pesan)->firstOrFail();



        return response()->json([
            'data' => new PesananResource($pesananForPrint),
            'message' => 'Pesanan Tersimpan',
            'status'    => 200
        ],200);

    }



    public function show($kode_pesan)
    {
        // dd($kode_pesan);
        $pesanan = Pesanan::with('customer','detailPakaian','buktiPakaians','detailPesanan.jenisCuci.categoryPaket')->when(
            $kode_pesan,
            fn($query) => $query->where('kode_pesan', $kode_pesan)
        )->first();
        // dd($pesanan);
        // $pesanan = $pesanan->load();


        if($pesanan !== null){

            $data['pesanan'] = new PesananResource($pesanan);

            return response()->json([
                'data'  => $data,
                'message'   => 'Detail Pesanan ' . $pesanan->kode_pesan,
                'success'   => true,
            ],200);
        }

        return response()->json([
            'message' => 'Data Not Found',
            'status' => 404,
            'success' => false
        ], 200);

    }

    public function update(Request $request, Pesanan $pesanan)
    {
        // $data  = json_decode($request->data);
        $status = $request->status;
        // $statusPembayaran = $pesanan->status_pembayaran == "Lunas" ? "Lunas" : ;

        if(isset($request->antar)){
            $pesanan->update([
                'antar' => $request->antar
            ]);

            $pesanan = $pesanan->load('customer','detailPesanan.jenisCuci.categoryPaket','detailPakaian');


            return response()->json([
                'data' => new PesananResource($pesanan),
                'message' => 'Order Updated Successfully !',
                'status' => 200,
            ],200);
        }

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
        }
        else if($status == 'selesai'){

            $pesanan->update([
                'status' => $status,
                'selesai_at' => Carbon::now()->toDateString(),
                // 'tanggal_ambil' => Carbon::now()->toDateTimeString()
            ]);
        }
        else{
            $pesanan->update([
                'status' => $status,
                // 'selesai_at' => Carbon::now()->toDateString(),
                'tanggal_ambil' => Carbon::now()->toDateTimeString()
            ]);
        }

        return response()->json([
            'message' => 'Status Pesanan ' . $pesanan->kode_pesan . ' berhasil diubah!',
            'status' => 200
        ],200);
    }

    public function urutanPengerjaan(){
        $idOutlet = $this->checkActiveOutlet();
       $urutan = $this->pesanan->where('status','cuci');
       $urutan = $urutan->where('id_outlet', $idOutlet);
       $urutan = $urutan->orderBy('tanggal_selesai');
       $urutan = $urutan->get();

       $data['urutan'] = $urutan;


       return response()->json([
            'data' => $data,
            'message' => 'Urutan Pesanan',
            'success'   => true,
       ],200);
    }

    public function ambilSekarang(){
        $idOutlet = $this->checkActiveOutlet();

        $ambil = $this->pesanan->whereDate('tanggal_selesai', '<=', Carbon::today());
        $ambil = $ambil->where('status', '!=', 'diambil');
        $ambil = $ambil->where('status', '!=','batal');
        $ambil = $ambil->where('id_outlet', $idOutlet);
        $ambil = $ambil->orderBy('tanggal_selesai');
        $ambil = $ambil->get();

        $data['ambil']=$ambil;

        return response()->json([
            'data'  => $data,
            'message' => 'Data Estimasi Ambil Hari Ini',
            'success'   => true
        ],200);
    }

    public function pesananAll(Request $request){
        $dateFrom = $request->query('dateFrom');
        $dateTo = $request->query('dateTo');

        $pesanan = Pesanan::with('customer','detailPesanan.jenisCuci.categoryPaket');
    }

    public function lastOrder(Request $request){
        $idOutlet = $this->checkActiveOutlet();

        $pesanan = $this->pesanan
            ->where('id_outlet', $idOutlet)
            ->orderBy('id','desc')->first();

        $data['pesanan'] = $pesanan;

        return response()->json([
            'data' => $data,
            'message' => 'Order Terakhir',
            'success' => true
        ],200);
    }

    public function checkActiveOutlet()
    {
        $idOutlet = '';
        $cacheName = auth()->user()->id . "-" . "activeOutlet";
        if(Cache::has($cacheName))
        {
            $cacheOutlet = Cache::get($cacheName);
            $idOutlet = $cacheOutlet['id_outlet'];

        }else{
            $idOutlet = auth()->user()->pegawai->onOutlet->id_outlet ? auth()->user()->pegawai->onOutlet->id_outlet : '';
        }

        return $idOutlet;
    }


}
