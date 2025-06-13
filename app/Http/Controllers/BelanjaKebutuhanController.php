<?php

namespace App\Http\Controllers;

use App\Models\BelanjaKebutuhan;
use App\Http\Requests\BelanjaKebutuhan\StoreBelanjaKebutuhanRequest;
use App\Http\Requests\BelanjaKebutuhan\UpdateBelanjaKebutuhanRequest;
use App\Models\DanaKeluar;
use App\Models\SumberDana;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class BelanjaKebutuhanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $idOutlet = $this->checkActiveOutlet();
        $sumberDanas = SumberDana::all();
        $searchData = $request->query('searchData');
        $rowPerPage = $request->query('rowPerPage');
        $dateFrom = $request->query('dateFrom') == null ? Carbon::now()->firstOfYear()->toDateString() : $request->query('dateFrom') ;
        $dateTo = $request->query('dateTo') == null ? Carbon::now()->toDateString() : $request->query('dateTo');
        if($rowPerPage == null){
            $rowPerPage = 10;
        }

        $kebutuhans = BelanjaKebutuhan::query();
        $kebutuhans = $kebutuhans->whereBetween('tanggal_pembelian', [$dateFrom, $dateTo]);
        $kebutuhans = $kebutuhans->when(
            $searchData,
            fn ($query) =>
            $query->where('nama', 'like', '%' .$searchData . '%')
            ->orWhere('harga', 'like', '%' . $searchData . '%')
            ->orWhere('qty', 'like', '%' . $searchData . '%')
            ->orWhere('total_pembelian', 'like', '%' . $searchData . '%')
        );

        // dd($kebutuhans->get());
        $kebutuhans = $kebutuhans->where('id_outlet', $idOutlet);
        $kebutuhans = $kebutuhans->orderBy('tanggal_pembelian', 'DESC')->paginate($rowPerPage)->withQuerystring();
        $totalByMonth = BelanjaKebutuhan::query();
        if($request->query('dateFrom') != null || $request->query('dateTo') != null){
            $totalByMonth = BelanjaKebutuhan::query();
            $totalByMonth = $totalByMonth->when(
                $searchData,
                fn($query)=> $query->where('nama', 'like', '%' .$searchData . '%')
                ->orWhere('harga', 'like', '%' . $searchData . '%')
                ->orWhere('qty', 'like', '%' . $searchData . '%')
                ->orWhere('total_pembelian', 'like', '%' . $searchData . '%')
            );
            $totalByMonth = $totalByMonth->where('id_outlet', $idOutlet);
            $totalByMonth = $totalByMonth->whereBetween('tanggal_pembelian', [$dateFrom, $dateTo])->sum('total_pembelian');
        }else{
            $totalByMonth = BelanjaKebutuhan::whereMonth('tanggal_pembelian', Carbon::now()->month)
            ->whereYear('tanggal_pembelian', Carbon::now()->year)
            ->where('id_outlet', $idOutlet)
            ->sum('total_pembelian');
        }
        $totalByYear = BelanjaKebutuhan::whereYear('tanggal_pembelian', Carbon::now()->year)
            ->where('id_outlet', $idOutlet)
            ->sum('total_pembelian');

        return Inertia::render('Harmony/BelanjaKebutuhan', compact(
            'kebutuhans',
            'totalByMonth',
            'totalByYear',
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
    public function store(StoreBelanjaKebutuhanRequest $request)
    {
        $request->validated();

        $idOutlet = $this->checkActiveOutlet();
        $harga = str_replace('.', '', $request->harga);
        $total_pembelian = $harga * $request->qty;

        $danaKeluar = new DanaKeluar();
        $danaKeluar->sumber_dana_id = $request->sumber_dana_id;
        $danaKeluar->keperluan = 'Belanja ' . $request->nama;
        $danaKeluar->jumlah_keluar = $total_pembelian;
        $danaKeluar->tanggal_keluar = $request->tanggal_pembelian;
        $danaKeluar->keterangan = 'Dana keluar sebesar ' . $total_pembelian . ' untuk belanja ' . $request->nama;
        $danaKeluar->save();

        $belanjaKebutuhan = new BelanjaKebutuhan();
        $belanjaKebutuhan->id_dana_keluar = $danaKeluar->id;
        $belanjaKebutuhan->sumber_dana_id = $request->sumber_dana_id;
        $belanjaKebutuhan->nama = $request->nama;
        $belanjaKebutuhan->qty = $request->qty;
        $belanjaKebutuhan->satuan = $request->satuan;
        $belanjaKebutuhan->harga = $harga;
        $belanjaKebutuhan->total_pembelian = $total_pembelian;
        $belanjaKebutuhan->keterangan = $request->keterangan;
        $belanjaKebutuhan->tanggal_pembelian = $request->tanggal_pembelian;
        $belanjaKebutuhan->id_outlet = $idOutlet;
        $belanjaKebutuhan->save();

        return back()->with('success', 'Data ' . $belanjaKebutuhan->nama . ' berhasil ditambah!');
    }

    /**
     * Display the specified resource.
     */
    public function show(BelanjaKebutuhan $belanjaKebutuhan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BelanjaKebutuhan $belanjaKebutuhan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBelanjaKebutuhanRequest $request, BelanjaKebutuhan $belanjaKebutuhan)
    {
        $request->validated();

        $harga = str_replace('.', '', $request->harga);
        $total_pembelian = $harga * $request->qty;

        $belanjaKebutuhan->danaKeluar->update([
            'sumber_dana_id' => $request->sumber_dana_id,
            'keperluan' => 'Belanja ' . $request->nama,
            'jumlah_keluar' => $total_pembelian,
            'tanggal_keluar' => $request->tanggal_pembelian,
            'keterangan' => 'Dana keluar sebesar ' . $total_pembelian . ' untuk belanja ' . $request->nama,
        ]);


        $belanjaKebutuhan->update([
            'sumber_dana_id' => $request->sumber_dana_id,
            'nama' => $request->nama,
            'qty'   => $request->qty,
            'satuan'    => $request->satuan,
            'harga' => $harga,
            'total_pembelian'   => $total_pembelian,
            'keterangan'   => $request->keterangan,
            'tanggal_pembelian' => $request->tanggal_pembelian
        ]);

        return back()->with('success', 'Data ' . $belanjaKebutuhan->nama . ' berhasil diubah.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BelanjaKebutuhan $belanjaKebutuhan)
    {
        $data = $belanjaKebutuhan;
        $belanjaKebutuhan->danaKeluar->delete();
        $belanjaKebutuhan->delete();

        return back()->with('success', 'Data ' . $data->nama . ' berhasil dihapus!');
    }

    public function checkActiveOutlet()
    {
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
    }
}
