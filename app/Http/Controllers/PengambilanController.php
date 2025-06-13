<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengambilanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // dd($request);
        $pesanan = Pesanan::with('customer')
            ->where('kode_pesan', $request->kode_pesan)->first();

        if($pesanan != null){
            if($pesanan->status_pembayaran == "Lunas"){
                $pesanan->update([
                    'status' => 'diambil',
                    'tanggal_ambil' => Carbon::now()->toDateTimeString(),
                ]);
            }
        }
        return Inertia::render('Harmony/Pengambilan/Index',compact(
            'pesanan'
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Pesanan $pesanan)
    {

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
    public function update(Request $request, Pesanan $pesanan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pesanan $pesanan)
    {
        //
    }
}
