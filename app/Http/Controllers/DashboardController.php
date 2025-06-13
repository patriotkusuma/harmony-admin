<?php

namespace App\Http\Controllers;

use App\Models\Outlet;
use App\Models\Pesanan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $idOutlet = $this->checkActiveOutlet();
        // if(!$idOutlet){

        //     if(auth()->user()->role == 'admin' || auth()->user()->role == 'owner'){
        //         $outlet = Outlet::latest()->first();
        //         $idOutlet = $outlet->id;
        //     }else{
        //         $idOutlet = auth()->user()->pegawai->onOutlet !== NULL ? auth()->user()->pegawai->onOutlet->id_outlet : '';
        //     }
        // }
        // dd($idOutlet);
        $pesanans = Pesanan::with('customer')
            ->where('id_outlet', $idOutlet)
            ->where('status', '!=', 'batal')->get();
        $firstOfMonth = Carbon::now()->firstOfMonth()->toDateString();
        $lastOfMonth = Carbon::now()->lastOfMonth()->toDateString();
        // $totalCustomer = $pesanans->groupBy('customer.nama')->count();
        // $totalPesanan = $pesanans->count();
        $totalCustomer = $pesanans->groupBy('customer.nama')->count();
        $totalPesanan = $pesanans->whereBetween('tanggal_pesan', [$firstOfMonth, $lastOfMonth])
        ->count();

        $estimasiBulanIni = Pesanan::whereBetween('tanggal_pesan', [$firstOfMonth, $lastOfMonth])
        ->where('status','!=','batal')
        ->where('id_outlet', $idOutlet)
        ->sum('total_harga');
        $pendapatanBulanIni = Pesanan::whereBetween('tanggal_pesan', [$firstOfMonth, $lastOfMonth])
        ->where('status_pembayaran','Lunas')
        ->where('id_outlet', $idOutlet)
        ->where('status', '!=','batal')
        ->sum('total_harga');

        $pesananDicuci = Pesanan::where('status', 'cuci')
            ->where('id_outlet', $idOutlet)->count();
        $pesananDiambil = Pesanan::where('status', 'diambil')
            ->where('id_outlet', $idOutlet)->count();
        $pesananSelesai = Pesanan::where('status','selesai')
            ->where('id_outlet', $idOutlet)->count();

        $urutanPesanan = Pesanan::with('customer', 'detailPesanan.jenisCuci');
        $urutanPesanan = $urutanPesanan->where('status', 'cuci');
        $urutanPesanan = $urutanPesanan->where('id_outlet', $idOutlet);
        $urutanPesanan = $urutanPesanan->orderBy('tanggal_selesai');
        $urutanPesanan = $urutanPesanan->get();

        $ambilHariIni = Pesanan::with('customer', 'detailPesanan.jenisCuci');
        $ambilHariIni = $ambilHariIni->whereDate('tanggal_selesai','<=', Carbon::today());
        $ambilHariIni = $ambilHariIni->where('status','!=','diambil');
        $ambilHariIni = $ambilHariIni->where('id_outlet', $idOutlet);
        $ambilHariIni = $ambilHariIni->orderBy('tanggal_selesai');
        $ambilHariIni = $ambilHariIni->get();

        // dd($ambilHariIni);

        $data = compact(
            'totalCustomer',
            'estimasiBulanIni',
            'pendapatanBulanIni',
            'pesananDicuci',
            'pesananDiambil',
            'pesananSelesai',
            'totalPesanan',
            'urutanPesanan',
            'ambilHariIni'
        );

        return Inertia::render('Dashboard', compact('data'));
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
        //s
        $cacheName = auth()->user()->id . "-" . "activeOutlet";
        if(Cache::has($cacheName)){
            Cache::delete($cacheName);

        }
        Cache::remember($cacheName, now()->addDay(1), function() use ($request){
            $data = [
                'id_user' => auth()->user()->id,
                'id_outlet' => $request->id
            ];

            return $data;
        }  );
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function checkActiveOutlet()
    {
        try{

            $idOutlet = '';
            $cacheName = auth()->user()->id . "-" . "activeOutlet";
            if(Cache::has($cacheName))
            {
                $cacheOutlet = Cache::get($cacheName);
                $idOutlet = $cacheOutlet['id_outlet'];

            }else{
                $idOutlet = auth()->user()->pegawai->onOutlet->id_outlet ? auth()->user()->pegawai->onOutlet->id_outlet : '';
            }
            return $idOutlet;
        }catch(\Exception $ex){
            return $idOutlet="";
        }

    }
}
