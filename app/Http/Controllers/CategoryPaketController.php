<?php

namespace App\Http\Controllers;

use App\Models\CategoryPaket;
use App\Http\Requests\CategoryPaket\StoreCategoryPaketRequest;
use App\Http\Requests\CategoryPaket\UpdateCategoryPaketRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryPaketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $searchData = $request->query('searchData');
        $rowPerPage = $request->query('rowPerPage');
        if($rowPerPage == null){
            $rowPerPage = 10;
        }

        $categoryPakets = CategoryPaket::query();
        $categoryPakets = $categoryPakets->when(
            $searchData,
            fn ($query) =>
            $query->where('deskripsi', 'like', '%' . $searchData . '%')
                ->orWhere('nama', 'like', '%' . $searchData . '%')
                ->orWhere('durasi', 'like', '%' . $searchData . '%')
                ->orWhere('tipe_durasi', 'like', '%' . $searchData . '%')
        );

        $categoryPakets = $categoryPakets->paginate($rowPerPage)->withQueryString();
        return Inertia::render('Harmony/CategoryPaket/Index', compact([
            'categoryPakets'
        ]));
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
    public function store(StoreCategoryPaketRequest $request)
    {

        $categoryPaket =new CategoryPaket();
        $categoryPaket->create([
            'nama'  => $request->nama,
            'tipe_durasi' => $request->tipe_durasi,
            'durasi' => $request->durasi,
            'deskripsi' => $request->deskripsi,
        ]);

        return back()->with('success', 'Data ' . $categoryPaket->nama . ' berhasil ditambah!');

    }

    /**
     * Display the specified resource.
     */
    public function show(CategoryPaket $categoryPaket)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CategoryPaket $categoryPaket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryPaketRequest $request, CategoryPaket $categoryPaket)
    {
        $categoryPaket->update([
            'nama'  => $request->nama,
            'tipe_durasi' => $request->tipe_durasi,
            'durasi' => $request->durasi,
            'deskripsi' => $request->deskripsi,
        ]);

        return back()->with('success', 'Data ' . $categoryPaket->nama . ' berhasil diubah!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CategoryPaket $categoryPaket)
    {
        $removedData = $categoryPaket;

        $categoryPaket->delete();

        return back()->with('success', 'Data ' . $removedData->nama . ' berhasil dihapus!');

    }
}
