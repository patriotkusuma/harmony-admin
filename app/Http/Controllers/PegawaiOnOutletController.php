<?php

namespace App\Http\Controllers;

use App\Models\PegawaiOnOutlet;
use App\Http\Requests\StorePegawaiOnOutletRequest;
use App\Http\Requests\UpdatePegawaiOnOutletRequest;

class PegawaiOnOutletController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    private $pegawaiOnOutlet;
    public function index()
    {
        $this->pegawaiOnOutlet = PegawaiOnOutlet::query();
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
    public function store(StorePegawaiOnOutletRequest $request)
    {
        // dd($request->all());
        $pegawaiOnOutlet = new PegawaiOnOutlet();
        $pegawaiOnOutlet->id_outlet = $request->id_outlet;
        $pegawaiOnOutlet->id_pegawai = $request->id_pegawai;
        $pegawaiOnOutlet->id_jabatan = $request->id_jabatan;
        $pegawaiOnOutlet->keterangan = $request->keterangan;
        $pegawaiOnOutlet->save();
        // $this->pegawaiOnOutlet->create($request->all());
        return back()->with('success', 'Berhasil Tambah Pegawai di Outlet 🥰');
    }

    /**
     * Display the specified resource.
     */
    public function show(PegawaiOnOutlet $pegawaiOnOutlet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PegawaiOnOutlet $pegawaiOnOutlet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePegawaiOnOutletRequest $request, PegawaiOnOutlet $pegawaiOnOutlet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PegawaiOnOutlet $pegawaiOnOutlet)
    {
        //
    }
}
