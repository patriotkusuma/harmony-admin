<?php

namespace App\Http\Controllers;

use App\Models\DetailPakaian;
use App\Http\Requests\StoreDetailPakaianRequest;
use App\Http\Requests\UpdateDetailPakaianRequest;
use App\Models\Pesanan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\Printer;
use Rawilk\Printing\Facades\Printing;
use Rawilk\Printing\Receipts\ReceiptPrinter;

class DetailPakaianController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreDetailPakaianRequest $request)
    {
        $kodePesan = $request->kodePesan;

        $pesanan = Pesanan::where('kode_pesan', $kodePesan)->first();
        // dd($pesanan);
        $detailPakaian = new DetailPakaian();
        $detailPakaian->id_pesanan = $pesanan->id;
        $detailPakaian->id_pelanggan = $pesanan->customer->id;
        $detailPakaian->nama_pakaian = $request->nama;
        $detailPakaian->jumlah = $request->jumlah;
        $detailPakaian->save();

        return redirect()->back()->with('success', 'Detail pakaian berhasil ditambah !');
    }

    /**
     * Display the specified resource.
     */
    public function show(DetailPakaian $detailPakaian)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DetailPakaian $detailPakaian)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDetailPakaianRequest $request, DetailPakaian $detailPakaian)
    {
        // dd($request);
        $detailPakaian->update([
            'nama_pakaian' => $request->nama,
            'jumlah'   => $request->jumlah
        ]);

        return redirect()->back()->with('success', 'Data berhasil diubah!');
    }

    public function updateJumlah(UpdateDetailPakaianRequest $request, DetailPakaian $detailPakaian)
    {
        // dd($request);
        $detailPakaian->update([
            'jumlah'    => $request->jumlah
        ]);

        return back();
    }

    public function print(Pesanan $pesanan){
        $detailPakaian = $pesanan->detailPakaian;
        $connector = new WindowsPrintConnector('pos-58c');
        $printer = new Printer($connector);

        $printer -> initialize();
        $printer -> setJustification(Printer::JUSTIFY_CENTER);
        $printer -> text("Harmony Laundry\n");
        $printer -> text("Jln. Candi Gebang\n");
        $printer -> text("telp / wa : 08363324517\n");
        $printer -> feed(2);
        $printer -> setJustification(Printer::JUSTIFY_LEFT);
        $printer -> text("No : " . $pesanan->kode_pesan . "\n");
        $printer -> text("Nama : " . $pesanan->customer->nama . " \n");
        $printer -> text("No Wa : " . $pesanan->customer->telpon . " \n");
        $printer->setJustification(Printer::JUSTIFY_CENTER);
        $printer->text("--------------------------------\n");
        $printer -> feed(1);


        foreach ($pesanan->detailPakaian as $key => $value) {
            // $jenisCuci = JenisCuci::find($value->id);
            // $line = sprintf('%-40.40s %5.0f %13.2f %13.2f', $item_name, $quantity, $price, $total);
            $printer -> text($this->columnify($value->nama_pakaian, $value->jumlah . " pcs", 22, 10, 0));
            // $printer -> text($this->columnify("    ".($value->qty * 1000) . " gram", "Rp " . ($value->total_harga), 22, 10, 0));
        }

        $printer->feed(1);
        $printer->setJustification(Printer::JUSTIFY_CENTER);
        $printer->text("--------------------------------\n");
        $printer->feed(2);
        $printer->setJustification(Printer::JUSTIFY_CENTER);
        $printer->text("Terima Kasih\n");
        $printer->text("Jangan lupa kembali lagi.\n");
        $printer->feed(10);
        // $printer -> cut();
        $printer->close();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DetailPakaian $detailPakaian)
    {
        $detailPakaian->delete();
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
}
