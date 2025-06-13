<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Pesanan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\Printer;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::get()->groupBy('nama');
        dd($customers);
        return Inertia::render('Harmony/Customer', compact(
            'customers'
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
    public function store(StoreCustomerRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        //
    }

    public function print(Customer $customer, Request $request)
    {

        $jumlah = $request->jumlah;
        $kode_pesan = $request->kode_pesan;
        $connector = new WindowsPrintConnector('pos-58c');
        $printer = new Printer($connector);

        $pesanan = Pesanan::where('kode_pesan', $kode_pesan)->firstOrFail();


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

            # code...
        $printer -> initialize();
        $printer -> setJustification(Printer::JUSTIFY_CENTER);
        if($pesanan->status_pembayaran != "Lunas"){
            $printer->setTextSize(2,2);
            $printer->text("Rp " .number_format(($totalHarga * 1000),'0',',','.'));
            $printer->feed(2);
        }else{
            $printer->setTextSize(2,2);
            $printer->text("Lunas");
            $printer->feed(2);
        }
        $printer -> setTextSize(3, 5);

        // $printer->qrCode($kode_pesan, Printer::QR_ECLEVEL_L, 7);
        // $printer->feed(1);
        $printer -> text($pesanan->customer->nama . "\n");
        $printer -> feed(10);
        // $printer -> cut();
        $printer -> close();


    }
}
