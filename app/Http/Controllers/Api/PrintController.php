<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\Printer;

class PrintController extends Controller
{
    private $printer, $connector, $authToken;
    public function __construct()
    {
        // $this->connector = new WindowsPrintConnector('pos-58c');
        // $this->printer = new Printer($this->connector);
        // $this->authToken =  "6|aZLtCqWD8a5ciarWB1wOzxkybShVjuCLgPpSeWoC5ef1d5b4";
    }

    public function printOrder(Request $request)
    {
        // $kode_pesan = $request->kode_pesan;
        // $token = "6|aZLtCqWD8a5ciarWB1wOzxkybShVjuCLgPpSeWoC5ef1d5b4";
        // $pesanan = Http::withToken($token)
        //     ->get('https://silaundry.my.id/api/order/' . $kode_pesan);

        // $pesanan = $pesanan->json();
        // $pesanan = (object) $pesanan['data']['pesanan'];
        // $pesanan = json_decode(json_encode($pesanan));
        // $data =json_decode($request->data);
        // $printer = $this->printer;

        // $printer->initialize();
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer -> text("Harmony Laundry\n");
        // $printer -> text("Jln. Candi Gebang\n");
        // $printer -> text("telp / wa : 0895363324517\n");
        // $printer -> feed(2);
        // $printer -> setJustification(Printer::JUSTIFY_LEFT);
        // $printer -> text("Tanggal : " . Carbon::parse($pesanan->tanggal_pesan)->format("H:i, d M Y") . "\n");
        // $printer -> text("Selesai : " . Carbon::parse($pesanan->tanggal_selesai)->format("H:i, d M Y") . "\n");
        // $printer -> text("No : " . $pesanan->kode_pesan . "\n");
        // $printer -> text("Nama : " . $pesanan->customer->nama . " \n");
        // $printer -> text("No Wa : " . $pesanan->customer->telpon . " \n");
        // $printer->selectPrintMode(Printer::MODE_EMPHASIZED);
        // $printer->selectPrintMode(Printer::MODE_DOUBLE_HEIGHT);
        // // $printer->text("Pembayaran : " . $pesanan->status_pembayaran . "\n");
        // $printer->selectPrintMode(Printer::MODE_FONT_A);
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer->text("--------------------------------\n");
        // $printer->feed(1);

        // foreach ($pesanan->detail_pesanan as $key => $value) {
        //     $printer->setJustification(Printer::JUSTIFY_LEFT);
        //     $printer->text($value->jenis_cuci->category_paket->nama . "\n");
        //     $printer->text($value->jenis_cuci->nama."\n");
        //     $printer->setJustification(Printer::JUSTIFY_RIGHT);

        //     $isKg = "";
        //     switch ($value->jenis_cuci->tipe) {
        //         case 'per_kilo':
        //             $isKg='kg';
        //             break;

        //         case 'satuan':
        //             $isKg = 'pcs';
        //             break;

        //         case 'kilo_meter':
        //             $isKg = 'km';
        //             break;

        //         default:
        //             $isKg = 'meter';
        //             break;
        //     }
        //     // $qty = $value->qty < 1 ? ($value->qty * 1000) : $value->qty;
        //     $line = sprintf('%5.2f %3s  x  %8.0f %8.0f', $value->qty, $isKg ,$value->harga, $value->total_harga);
        //     $printer->text($line . "\n");
        // }
        // $printer->feed(1);
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer->text("--------------------------------\n");
        // $printer->setJustification(Printer::JUSTIFY_RIGHT);
        // $printer->text("Total : " . "Rp " . number_format($pesanan->total_harga, 0,',','.'));
        // $printer->feed(2);
        // $printer->setEmphasis(true);
        // $printer->setTextSize(2,2);
        // // $printer->selectPrintMode(Printer::MODE_DOUBLE_HEIGHT);
        // // $printer->selectPrintMode(Printer::MODE_DOUBLE_WIDTH);
        // $printer->setJustification(Printer::JUSTIFY_LEFT);
        // $printer->text($pesanan->status_pembayaran);
        // $printer->feed(2);
        // $printer->setTextSize(1,1);
        // $printer->setEmphasis(true);
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer->text("Selesai \n");
        // $printer->setTextSize(2,2);
        // $printer->text(Carbon::parse($pesanan->tanggal_selesai)->format("H:i, d F Y"));
        // $printer->selectPrintMode(Printer::MODE_FONT_A);
        // $printer->setEmphasis(false);
        // $printer->feed(2);
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer->text("Terima Kasih\n");
        // $printer->text("Jangan lupa kembali lagi.\n");
        // $printer->feed(8);
        // $printer->close();
    }

    public function lastOrder(Request $request){

        // $pesanan = json_decode($request->data);
        // $data =json_decode($request->data);
        // $printer = $this->printer;

        // $printer->initialize();
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer -> text("Harmony Laundry\n");
        // $printer -> text("Jln. Candi Gebang\n");
        // $printer -> text("telp / wa : 0895363324517\n");
        // $printer -> feed(2);
        // $printer -> setJustification(Printer::JUSTIFY_LEFT);
        // $printer -> text("Tanggal : " . Carbon::parse($pesanan->tanggal_pesan)->format("H:i, d M Y") . "\n");
        // $printer -> text("Selesai : " . Carbon::parse($pesanan->tanggal_selesai)->format("H:i, d M Y") . "\n");
        // $printer -> text("No : " . $pesanan->kode_pesan . "\n");
        // $printer -> text("Nama : " . $pesanan->customer->nama . " \n");
        // $printer -> text("No Wa : " . $pesanan->customer->telpon . " \n");
        // $printer->selectPrintMode(Printer::MODE_EMPHASIZED);
        // $printer->selectPrintMode(Printer::MODE_DOUBLE_HEIGHT);
        // // $printer->text("Pembayaran : " . $pesanan->status_pembayaran . "\n");
        // $printer->selectPrintMode(Printer::MODE_FONT_A);
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer->text("--------------------------------\n");
        // $printer->feed(1);

        // foreach ($pesanan->detail_pesanan as $key => $value) {
        //     $printer->setJustification(Printer::JUSTIFY_LEFT);
        //     $printer->text($value->jenis_cuci->category_paket->nama . "\n");
        //     $printer->text($value->jenis_cuci->nama."\n");
        //     $printer->setJustification(Printer::JUSTIFY_RIGHT);

        //     $isKg = "";
        //     switch ($value->jenis_cuci->tipe) {
        //         case 'per_kilo':
        //             $isKg='kg';
        //             break;

        //         case 'satuan':
        //             $isKg = 'pcs';
        //             break;

        //         case 'kilo_meter':
        //             $isKg = 'km';
        //             break;

        //         default:
        //             $isKg = 'meter';
        //             break;
        //     }
        //     // $qty = $value->qty < 1 ? ($value->qty * 1000) : $value->qty;
        //     $line = sprintf('%5.2f %3s  x  %8.0f %8.0f', $value->qty, $isKg ,$value->harga, $value->total_harga);
        //     $printer->text($line . "\n");
        // }
        // $printer->feed(1);
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer->text("--------------------------------\n");
        // $printer->setJustification(Printer::JUSTIFY_RIGHT);
        // $printer->text("Total : " . "Rp " . number_format($pesanan->total_harga, 0,',','.'));
        // $printer->feed(2);
        // $printer->setEmphasis(true);
        // $printer->setTextSize(2,2);
        // // $printer->selectPrintMode(Printer::MODE_DOUBLE_HEIGHT);
        // // $printer->selectPrintMode(Printer::MODE_DOUBLE_WIDTH);
        // $printer->setJustification(Printer::JUSTIFY_LEFT);
        // $printer->text($pesanan->status_pembayaran);
        // $printer->feed(2);
        // $printer->setTextSize(1,1);
        // $printer->setEmphasis(true);
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer->text("Selesai \n");
        // $printer->setTextSize(2,2);
        // $printer->text(Carbon::parse($pesanan->tanggal_selesai)->format("H:i, d F Y"));
        // $printer->selectPrintMode(Printer::MODE_FONT_A);
        // $printer->setEmphasis(false);
        // $printer->feed(2);
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer->text("Terima Kasih\n");
        // $printer->text("Jangan lupa kembali lagi.\n");
        // $printer->feed(8);
        // $printer->close();
    }

    public function printPesanan(Request $request)
    {
        // $data = json_decode($request->data);
        // $printer = $this->printer;

        // $printer->initialize();
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer -> text("Harmony Laundry\n");
        // $printer -> text("Jln. Candi Gebang\n");
        // $printer -> text("telp / wa : 0895363324517\n");
        // $printer -> feed(2);
        // $printer -> setJustification(Printer::JUSTIFY_LEFT);
        // $printer -> text("Tanggal : " . Carbon::parse($data->tanggal_pesan)->format("H:i, d M Y") . "\n");
        // $printer -> text("Selesai : " . Carbon::parse($data->tanggal_selesai)->format("H:i, d M Y") . "\n");
        // $printer -> text("No : " . $data->kode_pesan . "\n");
        // $printer -> text("Nama : " . $data->customer->nama . " \n");
        // $printer -> text("No Wa : " . $data->customer->telpon . " \n");
        // // $printer->selectPrintMode(Printer::MODE_EMPHASIZED);
        // // $printer->selectPrintMode(Printer::MODE_DOUBLE_HEIGHT);
        // // $printer->text("Pembayaran : " . $data->status_pembayaran . "\n");
        // $printer->selectPrintMode(Printer::MODE_FONT_A);
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer->text("--------------------------------\n");
        // $printer->feed(1);

        // foreach ($data->detail_pesanan as $key => $value) {
        //     $printer->setJustification(Printer::JUSTIFY_LEFT);
        //     $printer->text($value->jenis_cuci->category_paket->nama . "\n");
        //     $printer->text($value->jenis_cuci->nama."\n");
        //     $printer->setJustification(Printer::JUSTIFY_RIGHT);

        //     $isKg = "";
        //     switch ($value->jenis_cuci->tipe) {
        //         case 'per_kilo':
        //             $isKg='kg';
        //             break;

        //         case 'satuan':
        //             $isKg = 'pcs';
        //             break;
        //         case 'kilo_meter':
        //             $isKg = 'km';
        //             break;

        //         default:
        //             $isKg = 'meter';
        //             break;
        //     }
        //     $qty = $value->qty < 1 ? ($value->qty * 1000) : $value->qty;
        //     $line = sprintf('%5.2f %3s  x  %8.0f %8.0f', $qty, $isKg ,$value->harga, $value->total_harga);
        //     $printer->text($line . "\n");
        // }
        // $printer->feed(1);
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer->text("--------------------------------\n");
        // $printer->setJustification(Printer::JUSTIFY_RIGHT);
        // $printer->text("Total : " . "Rp " . number_format($data->total_harga, 0,',','.'));
        // $printer->feed(2);
        // $printer->feed(2);
        // $printer->setEmphasis(true);
        // // $printer->selectPrintMode(Printer::MODE_DOUBLE_HEIGHT);
        // // $printer->selectPrintMode(Printer::MODE_DOUBLE_WIDTH);
        // $printer -> setTextSize(2,2);
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer->text($data->customer->nama. "\n");
        // $printer->selectPrintMode(Printer::MODE_FONT_A);
        // $printer->setEmphasis(false);
        // $printer->feed(2);
        // $printer->setJustification(Printer::JUSTIFY_LEFT);
        // $printer->text("# Kumpulkan 10 nota \n");
        // $printer->text("# Dapatkan gratis cuci 1 kali\n");
        // $printer->text("# (max 5 kg)");
        // $printer->feed(2);
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer->text("Terima Kasih\n");
        // $printer->text("Jangan lupa kembali lagi.\n");
        // $printer->feed(10);
        // $printer->close();


    }


    public function printPakaian(Request $request)
    {
        // $data = json_decode($request->data);

        // $printer = $this->printer;
        // $printer->initialize();


        // $printer->initialize();
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer -> text("Harmony Laundry\n");
        // $printer -> text("Jln. Candi Gebang\n");
        // $printer -> text("telp / wa : 0895363324517\n");
        // $printer -> feed(2);
        // $printer -> setJustification(Printer::JUSTIFY_LEFT);
        // $printer -> text("Tanggal : " . Carbon::parse($data->tanggal_pesan)->format("H:i, d M Y") . "\n");
        // $printer -> text("Selesai : " . Carbon::parse($data->tanggal_selesai)->format("H:i, d M Y") . "\n");
        // $printer -> text("No : " . $data->kode_pesan . "\n");
        // $printer -> text("Nama : " . $data->customer->nama . " \n");
        // $printer -> text("No Wa : " . $data->customer->telpon . " \n");
        // $printer->text("--------------------------------\n");
        // $printer->feed(1);

        // foreach ($data->detail_pakaian as $key => $value) {
        //     $printer->text($this->columnify($value->nama_pakaian, $value->jumlah . ' pcs', 22,10,0));
        // }

        // $printer->feed(1);
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer->text("--------------------------------\n");
        // $printer->feed(2);
        // $printer->setJustification(Printer::JUSTIFY_CENTER);
        // $printer->text("Terima Kasih\n");
        // $printer->text("Jangan lupa kembali lagi.\n");
        // $printer->feed(10);
        // // $printer -> cut();
        // $printer->close();

    }

    public function printNama(Request $request)
    {
        // $data =json_decode($request->data);
        // $now = Carbon::parse($data->tanggal_pesan);
        // $akhir = Carbon::parse($data->tanggal_selesai);

        // $printer = $this->printer;
        // $printer->initialize();
        // $printer -> setJustification(Printer::JUSTIFY_CENTER);

        // if($data->status_pembayaran != "Lunas"){
        //     $printer->setTextSize(2,2);
        //     $printer->text("Rp " .number_format($data->total_harga ,'0',',','.'));
        //     $printer->feed(2);
        // }else{
        //     $printer->setTextSize(2,2);
        //     $printer->text("Lunas");
        //     $printer->feed(2);
        // }
        // $printer -> setTextSize(3, 5);

        // // $printer->qrCode($kode_pesan, Printer::QR_ECLEVEL_L, 7);
        // // $printer->feed(1);
        // $printer -> text($data->customer->nama . "\n");
        // $printer -> feed(1);

        // foreach ($data->detail_pesanan as $key => $value) {
        //     $printer -> setTextSize(1, 1);
        //     $printer -> text("({$value->jenis_cuci->nama}) \n");
        //     $printer -> feed(1);
        // }
        // $printer -> setTextSize(2,2);
        // $printer -> text(round($now->floatDiffInDays($akhir),0,PHP_ROUND_HALF_UP) . " Hari\n");
        // $printer -> feed(10);
        // // $printer -> cut();
        // $printer -> close();
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
