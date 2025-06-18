<?php

namespace App\Http\Controllers;

use App\Models\JenisCuci;
use App\Http\Requests\StoreJenisCuciRequest;
use App\Http\Requests\UpdateJenisCuciRequest;
use App\Models\Account;
use App\Models\CategoryPaket;
use App\Models\Pegawai;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class JenisCuciController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $searchPaket = $request->query('searchData');
        $rowPerPage = $request->query('rowPerPage');
        if ($rowPerPage == null) {
            $rowPerPage = 10;
        }

        $pakets = JenisCuci::query();
        $pakets = $pakets->when(
            $searchPaket,
            fn ($query) =>
            $query->where('nama', 'like', '%' . $searchPaket . '%')
                ->orWhere('harga', 'like', '%' . $searchPaket . '%')
                ->orWhere('tipe', 'like', '%' . $searchPaket . '%')
        );

        $pakets = $pakets->latest()->paginate($rowPerPage)->withQueryString();
        return Inertia::render('Harmony/JenisCuci', compact('pakets'));
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
    public function store(StoreJenisCuciRequest $request)
    {

        $gambar = '';

        if($request->hasFile('gambar')){
            $extension = $request->file('gambar')->extension();
            $md5name = md5_file($request->file('gambar')->getRealPath());
            $gambar = $request->file('gambar')->storeAs('/paket',$request->nama . '_'.$md5name . '.' . $extension, 'uploads');
        }
        $jenisCuci = new JenisCuci();
        $jenisCuci->nama = $request->nama;
        $jenisCuci->harga = $request->harga;
        $jenisCuci->tipe = $request->tipe;
        $jenisCuci->keterangan = $request->keterangan;
        $jenisCuci->gambar = $gambar != '' ?  URL::asset('storage/media/'.$gambar) : '';
        $jenisCuci->save();




        return back()->with('success', 'Data' . $jenisCuci->nama . ' berhasil ditambah!');
    }

    /**
     * Display the specified resource.
     */
    public function show(JenisCuci $jenisCuci)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JenisCuci $jenisCuci)
    {
        $jenisCuci = $jenisCuci->load('categoryPaket', 'serviceRevenueAccount.account');
        $accounts = Account::where('account_type', 'Revenue')->get();
        $categoryPakets = CategoryPaket::all();
        // dd($jenisCuci);
        return Inertia::render('Harmony/JenisCuci/Edit',compact(
            'jenisCuci',
            'categoryPakets',
            'accounts'
        ));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJenisCuciRequest $request, JenisCuci $jenisCuci)
    {
        // $request->validated();


        // dd($request);
        $jenisCuci->update([
            'id_category_paket' => $request->id_category_paket,
            'nama'  => $request->nama,
            'harga' => $request->harga,
            'tipe'  => $request->tipe,
            'keterangan'    => $request->keterangan,
        ]);

        return redirect()->route('jenis-cuci.index')->with('success', 'Data ' . $jenisCuci->nama . ' berhasil diubah!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JenisCuci $jenisCuci)
    {
        $dataDelete = $jenisCuci;
        if($jenisCuci->gambar){
            Storage::delete($jenisCuci->gambar);
        }
        $jenisCuci->delete();
        return back()->with('success', 'Data ' . $dataDelete->nama . ' berhasil dihapus!');
    }

    public function updateImage(Request $request, JenisCuci $jenisCuci){
        $gambar = '';
        if($request->hasFile('gambar')){
            $extension = $request->file('gambar')->extension();
            $md5name = md5_file($request->file('gambar')->getRealPath());
            $gambar = $request->file('gambar')->storeAs('/paket', $jenisCuci->nama.'_'.$md5name . '.' . $extension, 'uploads');
        }

        $jenisCuci->update([
           'gambar' => $gambar !=null? URL::asset('storage/media/'.$gambar) : $jenisCuci->gambar
        ]);

        return redirect()->route('jenis-cuci.index')->with('success', 'Gambar ' . $jenisCuci->nama . ' berhasil diubah!');
    }
}
