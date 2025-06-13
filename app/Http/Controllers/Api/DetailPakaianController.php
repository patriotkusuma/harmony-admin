<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DetailPakaian;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class DetailPakaianController extends Controller
{

    private $detailPakaian;

    public function __construct()
    {
        $this->detailPakaian = new DetailPakaian();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $kodePesan = $request->kodePesan;

        $pesanan = Pesanan::where('kode_pesan', $kodePesan)->first();

        $this->detailPakaian->id_pesanan = $pesanan->id;
        $this->detailPakaian->id_pelanggan = $pesanan->customer->id;
        $this->detailPakaian->nama_pakaian = $request->nama;
        $this->detailPakaian->jumlah = $request->jumlah;
        $this->detailPakaian->save();

        return response()->json([
            'message'=> $this->detailPakaian->nama . ' Tersimpan',
            'status' => 200,
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(DetailPakaian $detailPakaian)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DetailPakaian $detailPakaian)
    {
        try{

            $id = $request->id;
            $detailPakaian = DetailPakaian::find($id);
            $detailPakaian->update([
                'nama_pakaian' => $request->nama,
                'jumlah' => $request->jumlah
            ]);

            return response()->json([
                'data' => $detailPakaian,
                'message' => $request->nama . ' Terupdate',
                'status' => 200,
            ],200);
        }catch(\Exception $err){
            return response()->json([
                'data' => $err,
                'message' => 'Gagal',
                'status'  => 404,
            ],200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DetailPakaian $detailPakaian)
    {
        $detailPakaian->delete();

        return response()->json([
            'message' => 'Pakaian dihapus',
            'status' => 200
        ],200);
    }

    public function updateJumlah(Request $request, DetailPakaian $detailPakaian)
    {
        $detailPakaian->update([
            'jumlah' => $request->jumlah
        ]);

        return response()->json([
            'message' => $detailPakaian->nama . ' berhasil update jumlah jadi ' . $request->jumlah,
            'status' => 200
        ],200);
    }
}
