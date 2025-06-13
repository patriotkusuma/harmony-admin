<?php

namespace App\Http\Controllers;

use App\Models\DanaKeluar;
use App\Http\Requests\DanaKeluar\StoreDanaKeluarRequest;
use App\Http\Requests\DanaKeluar\UpdateDanaKeluarRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DanaKeluarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $rowPerPage = $request->query('rowPerPage');

        $danaKeluars = DanaKeluar::query();
        $danaKeluars = $danaKeluars->paginate($rowPerPage != null ? $rowPerPage : 10)->withQueryString();
        $sumCurrentMonth = DanaKeluar::whereMonth('tanggal_keluar', Carbon::now()->month)->sum('jumlah_keluar');
        $sumCurrentYear = DanaKeluar::whereYear('tanggal_keluar', Carbon::now()->year)->sum('jumlah_keluar');
        return Inertia::render('Harmony/DanaKeluar', compact(
            'danaKeluars',
            'sumCurrentMonth',
            'sumCurrentYear'
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
    public function store(StoreDanaKeluarRequest $request)
    {
        try {

            $request->validated();
            $jumlah_keluar = str_replace('.', '', $request->jumlah_keluar);

            $danaKeluar = new DanaKeluar();
            $danaKeluar->keperluan = $request->keperluan;
            $danaKeluar->jumlah_keluar = $jumlah_keluar;
            $danaKeluar->tanggal_keluar = $request->tanggal_keluar;
            $danaKeluar->bukti_keluar = $request->bukti_keluar;
            $danaKeluar->keterangan = $request->keterangan;
            $danaKeluar->save();

            return back()->with('success', 'Data ' . $danaKeluar->keperluan . ' Berhasil Ditambah ');
        } catch (\Exception $ex) {
            return back()->with('errors', $ex);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(DanaKeluar $danaKeluar)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DanaKeluar $danaKeluar)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDanaKeluarRequest $request, DanaKeluar $danaKeluar)
    {


        $request->validated();
        $jumlah_keluar = str_replace('.', '', $request->jumlah_keluar);


        $danaKeluar->update([
            'keperluan' => $request->keperluan,
            'jumlah_keluar' => $jumlah_keluar,
            'tanggal_keluar'  => $request->tanggal_keluar,
            'bukti_keluar'  => $request->bukti_keluar,
            'keterangan'    => $request->keterangan,
        ]);

        return back()->with('success', 'Data ' . $danaKeluar->keperluan . ' berhasil diubah!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DanaKeluar $danaKeluar)
    {
        $keluar = $danaKeluar;
        $danaKeluar->delete();

        return back()->with('success', 'Data ' . $keluar->keperluan . ' berhasil dihapus!');
    }
}
