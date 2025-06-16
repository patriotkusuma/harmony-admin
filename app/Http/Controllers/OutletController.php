<?php

namespace App\Http\Controllers;

use App\Models\Outlet;
use App\Http\Requests\StoreOutletRequest;
use App\Http\Requests\UpdateOutletRequest;
use App\Models\Jabatan;
use App\Models\Pegawai;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class OutletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private $outlet;
    private $pegawai;
    private $jabatan;

    public function __construct()
    {
        $this->outlet = Outlet::query();
        $this->pegawai = Pegawai::query();
        $this->jabatan = Jabatan::query();
    }
    public function index()
    {
        // $outlets = Outlet::query();
        // if(auth()->user()->role == 'admin'){

        // }else{
        //     $outlets = $outlets->where('status', 'active')
        // }
        $outlets = $this->outlet->paginate(10)->withQueryString();

        return Inertia::render('Harmony/Outlet/Index', compact([
            'outlets'
        ]));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Harmony/Outlet/CreateOutlet');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOutletRequest $request)
    {
        // $outlet = new Outlet();
        // $outlet->id = Str::uuid();
        // $outlet->nama = $request->nama;
        // $outlet->nickname = $request->nickname;
        // $outlet->alamat = $request->alamat;
        // // $outlet->status = $request->status ? 'active' : $request->status;
        // $outlet->latitude = $request->latitude;
        // $outlet->longitude = $request->longitde;
        // $outlet->kode_qris = $request->kode_qris;
        // $outlet->foto_qris = $request->foto_qris;
        // $outlet->telpon = $request->telpon;
        // $outlet->logo = $request->logo;
        // $outlet->keterangan = $request->keterangan;
        // $outlet->save();

        $this->outlet->create($request->all() + ['id' => Str::uuid()]);

        return redirect()->route('outlet.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Outlet $outlet)
    {
        //
        $outlet = $outlet->load('PegawaiOnOutlet', 'PegawaiOnOutlet.jabatan', 'PegawaiOnOutlet.pegawai');
        $pegawais = $this->pegawai->get();
        $jabatans = $this->jabatan->get();
        return Inertia::render('Harmony/Outlet/DetailOutlet', compact([
            'outlet',
            'pegawais',
            'jabatans'
        ]));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Outlet $outlet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOutletRequest $request, Outlet $outlet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Outlet $outlet)
    {
        //
    }

    public function search(Request $request){
        $search = $request->query('search-outlet');

        $outlets = Outlet::where('nama', 'like', '%' . $search . '%')
            ->select('id', 'nama')
            ->limit(10)
            ->get();
        return response()->json($outlets);
    }
}
