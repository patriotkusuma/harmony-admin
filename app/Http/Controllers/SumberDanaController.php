<?php

namespace App\Http\Controllers;

use App\Models\SumberDana;
use App\Http\Requests\SumberDana\StoreSumberDanaRequest;
use App\Http\Requests\SumberDana\UpdateSumberDanaRequest;
use Inertia\Inertia;

class SumberDanaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sumberDanas = SumberDana::withSum('belanjaKebutuhan','total_pembelian');

        $sumberDanas = $sumberDanas->paginate(5)->withQueryString();
        return Inertia::render('Harmony/SumberDana/Index', compact(
            'sumberDanas'
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
    public function store(StoreSumberDanaRequest $request)
    {
        $sumberDana = SumberDana::create([
            'nama' => $request->nama,
            'keterangan' => $request->keterangan
        ]);

        return back()->with('success', 'Data berhasil ditambah!');
    }

    /**
     * Display the specified resource.
     */
    public function show(SumberDana $sumberDana)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SumberDana $sumberDana)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSumberDanaRequest $request, SumberDana $sumberDana)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SumberDana $sumberDana)
    {
        //
    }
}
