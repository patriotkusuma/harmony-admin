<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreBuktiPakaianRequest;
use App\Http\Requests\UpdateBuktiPakaianRequest;
use App\Models\BuktiPakaian;
use App\Models\Pesanan;
use Illuminate\Http\Request;
use Intervention\Image\ImageManager;
use Illuminate\Support\Str;
use Intervention\Image\Encoders\AutoEncoder;

use function PHPUnit\Framework\isNull;

class BuktiPakaianController extends BaseController
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
    public function store(Request $request)
    {
        $request->validate([
            'photo' => 'required|image:jpg,jpeg,png,gif,svg,webp',
            'kode_pesan' => 'required'
        ]);

        $kode_pesan = $request->kode_pesan;

        $pesanan = Pesanan::where('kode_pesan', $kode_pesan)->first();
        if(empty($pesanan)){
            return response()->json([
                'success' => false,
                'message' => 'Kode Pesan Tidak ditemukan',
            ],200);
        }

        $imageName =  $kode_pesan . "_". time() .'.'. $request->photo->extension();

        $image = ImageManager::gd()->read($request->file('photo'));
        // $image->encode(new );
        $image->encode(new AutoEncoder(quality:10));
        $image->save('bukti/'. $imageName);

        $buktiPakaian = new BuktiPakaian();
        $buktiPakaian->id = Str::uuid();
        $buktiPakaian->kode_pesan = $kode_pesan;
        $buktiPakaian->foto = "https://admin.harmonylaundry.my.id/bukti/" . $imageName;
        $buktiPakaian->save();


        return response()->json([
            'message' => "success"
        ]);

    }

    public function simpan_foto(Request $request)
    {
        dd('simpan_foto');
    }
}
