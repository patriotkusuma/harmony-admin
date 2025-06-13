<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use App\Http\Requests\Pegawai\StorePegawaiRequest;
use App\Http\Requests\Pegawai\UpdatePegawaiRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class PegawaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pegawais = Pegawai::query();
        $pegawais = $pegawais->paginate(5)->withQueryString();
        $totalPegawai = Pegawai::count();
        return Inertia::render(
            'Harmony/Pegawai',
            compact(
                'pegawais',
                'totalPegawai'
            )
        );
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
    public function store(StorePegawaiRequest $request)
    {
        $request->validated();

        $user = User::create([
            'name'  => $request->nama,
            'email' => $request->email,
            'password'  => Hash::make($request->password),
            'role'  => 'pegawai',
        ]);

        event(new Registered($user));

        $pegawai = new Pegawai();
        $pegawai->create([
            'user_id'   => $user->id,
            'nama'  => $request->nama,
            'alamat'    => $request->alamat,
            'telpon'    => $request->telpon,
            'email'     => $request->email,
            'gaji'      => $request->gaji,
            'status'    => $request->status ? $request->status : 'inactive',
            'tanggal_masuk' => $request->tanggal_masuk,
            'tanggal_keluar'    => $request->tanggal_keluar,
            'keterangan'    => $request->keterangan,
        ]);



        return back()->with('success', 'Berhasil menambah pegawai dengan nama ' . $pegawai->nama);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pegawai $pegawai)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pegawai $pegawai)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePegawaiRequest $request, Pegawai $pegawai)
    {

        $request->validated();

        if ($request->status) {
            $userSave = $pegawai->user->update(['status' => $request->status]);
        }

        $pegawai->update([
            'user_id'   => $pegawai->user->id,
            'nama'  => $request->nama,
            'alamat'    => $request->alamat,
            'telpon'    => $request->telpon,
            'email'     => $request->email,
            'gaji'      => $request->gaji,
            'status'    => $request->status ? $request->status : 'inactive',
            'tanggal_masuk' => $request->tanggal_masuk,
            'tanggal_keluar'    => $request->tanggal_keluar,
            'keterangan'    => $request->keterangan,
        ]);

        return back()->with('success', 'Berhasil mengubah data pegawai dengan nama ' . $pegawai->nama);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pegawai $pegawai)
    {
        $pegawaihapus = $pegawai;
        $pegawai->delete();

        return back()->with('success', 'Berhasil menghapus data pegawai dengan nama ' . $pegawaihapus->nama);
    }
}
