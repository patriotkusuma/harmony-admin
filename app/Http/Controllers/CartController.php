<?php

namespace App\Http\Controllers;

use App\Models\JenisCuci;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $cartItems = \Cart::getContent();

        // return route('')
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
    public function store(Request $request)
    {
        $jenisCuci = JenisCuci::find($request->idJenisCuci);

        $estimasiSelesai = Carbon::now();
        $tanggalSelesai = $jenisCuci->categoryPaket;

        if($tanggalSelesai->tipe_durasi == 'hari'){
            $estimasiSelesai = $estimasiSelesai->addDay($tanggalSelesai->durasi);
        }else{
            $estimasiSelesai = $estimasiSelesai->addHour($tanggalSelesai->durasi);
        }
        // dd($estimasiSelesai->timestamp);
        $price = 0;
        $quantity=0;
        if($jenisCuci->tipe == 'per_kilo'){
            $price = ($jenisCuci->harga/1000);
            $quantity = 2000;
        }else{
            $price = $jenisCuci->harga;
            $quantity = 1;
        }

        \Cart::add([
            'id'    => $jenisCuci->id,
            'name'  => $jenisCuci->nama,
            'price' => $price,
            'quantity'  => $quantity,
            'attributes'  => array(
                'image' => $jenisCuci->gambar,
                'category_paket'=> $jenisCuci->categoryPaket->nama,
                'tanggal_selesai' => $estimasiSelesai->timestamp,
            )
        ]);

        return back();

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // dd($request);
        \Cart::update(
            $id,
            [
                'quantity'  => [
                    'relative'  => false,
                    'value' => $request->qty
                ]
            ]
                );

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        \Cart::remove($id);
        return back();
    }

    public function clearAllCart()
    {
        \Cart::clear();

        return back();
    }
}
