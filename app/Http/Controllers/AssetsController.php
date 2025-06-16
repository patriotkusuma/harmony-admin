<?php

namespace App\Http\Controllers;

use App\Http\Requests\Asset\StoreAssetRequest;
use App\Http\Requests\Asset\UpdateAssetRequest;
use App\Models\Asset;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = $request->only(['search', 'start_date', 'end_date', 'per_page', 'page']);
        $perPage = $request->input('per_page', 10);

        $assets = Asset::filter($filter)
            ->orderBy('purchase_date')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Harmony/Assets/Index', [
            'assets' => $assets,
            'filters' => $filter,
        ]);
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
    public function store(StoreAssetRequest $request)
    {
        $validatedData = ($request->validated());

        if(isset($validatedData['purchase_price'])){
            $validatedData['purchase_price'] = $validatedData['purchase_price'];
        }else{
            $validatedData['purchase_price'] = $validatedData['purchase_price'] ?? 0.00;
            $validatedData['salvage_value'] = $validatedData['salvage_value'];
        }

        Asset::create($validatedData);

        return redirect()->route('asset.index')->with('success', 'Aset berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Asset $asset)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Asset $asset)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAssetRequest $request, Asset $asset)
    {
        $asset->update([
            'id_outlet' => $request->id_outlet,
            'asset_name' => $request->asset_name,
            'purchase_date' => $request->purchase_date,
            'purchase_price' => $request->purchase_price,
            'depreciation_method' => $request->depreciation_method,
            'usefull_live_years' => $request->usefull_live_years,
            'salvage_value' => $request->salvage_value,
            'accumulated_depreciation' => $request->accumulated_depreciation,
            'current_book_value' => $request->current_book_value,
            'description' => $request->description,
            'status' => $request->status,
            'last_depreciation_date' => $request->last_depreciation_date
        ]);

        return redirect()->route('asset.index')->with('success', 'Aset berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Asset $asset)
    {
        $asset->delete();
        return redirect()->route('asset.index')->with('success','Data aset berhasil dihapus');
    }
}
