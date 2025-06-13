<?php

namespace App\Http\Controllers;

use App\Models\Kontrakan;
use App\Http\Requests\StoreKontrakanRequest;
use App\Http\Requests\UpdateKontrakanRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class KontrakanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $searchData = $request->query('searchData');
        $rowPerPage = $request->query('rowPerPage');
        if($rowPerPage == null){
            $rowPerPage = 5;
        }

        $kontrakans = Kontrakan::query();
        $kontrakans = $kontrakans->when(
            $searchData,
            fn ($query) =>
            $query->where('no_wa', 'like', '%' . $searchData . '%')
                ->orWhere('harga', 'like', '%' . $searchData . '%')
                ->orWhere('nama', 'like', '%' . $searchData . '%')
                ->orWhere('alamat', 'like', '%' . $searchData . '%')
        );

        $kontrakans = $kontrakans->paginate($rowPerPage)->withQueryString();
        return Inertia::render('Harmony/Kontrakan/KontrakanIndex', compact([
            'kontrakans'
        ]));
        // return Inertia::render('Kontrakan/KontrakanIndex');
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
        $foto = '';
        if($request->hasFile('foto')){
            $file = $request->file('foto');
            $extension = $file->extension();
            $fileName = md5_file($file->getRealPath());
            $foto = $file->storeAs('/kontrakan', $fileName . '.' . $extension, 'uploads');

        }

        $kontrakan = new Kontrakan();
        $kontrakan->no_wa = $request->no_wa;
        $kontrakan->nama = $request->nama;
        $kontrakan->alamat = $request->alamat;
        $kontrakan->harga = $request->harga;
        $kontrakan->foto = $foto != '' ? URL::asset('storage/media/'. $foto): '';
        $kontrakan->keterangan = $request->keterangan;
        $kontrakan->save();

        return back()->with('success', 'Data ' . $kontrakan->no_wa . ' berhasil ditambah!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Kontrakan $kontrakan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kontrakan $kontrakan)
    {
        return Inertia::render('Harmony/Kontrakan/KontrakanEdit', compact(['kontrakan']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kontrakan $kontrakan)
    {
        $foto = '';
        if($request->hasFile('foto')){
            $file = $request->file('foto');
            $extension = $file->extension();
            $fileName = md5_file($file->getRealPath());
            $foto = $file->storeAs('/kontrakan', $fileName . '.' . $extension, 'uploads');

        }

        $kontrakan->update([
           'no_wa' => $request->no_wa,
           'nama' => $request->nama,
           'alamat' => $request->alamat,
           'harga' => $request->harga,
           'foto' => $foto != '' ? URL::asset('storage/media/'. $foto): $kontrakan->foto,
           'keterangan' => $request->keterangan,
        ]);


        return back()->with('success', 'Data ' . $kontrakan->no_wa . ' berhasil ditambah!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kontrakan $kontrakan)
    {
        $dataDelete = $kontrakan;
        if($kontrakan->foto){
            $imageUrl = $kontrakan->foto;
            $urlExploded = explode('/', $imageUrl);
            $end = end($urlExploded);
            Storage::disk('uploads')->delete('/kontrakan/' . $end);
        }

        $kontrakan->delete();

        return back()->with('success', 'Data '. $dataDelete->no_wa . ' berhasil dihapus !');


    }
}
