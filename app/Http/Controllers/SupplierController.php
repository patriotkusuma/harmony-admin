<?php

namespace App\Http\Controllers;

use App\Http\Requests\Supplier\StoreSupplierRequest;
use App\Http\Requests\Supplier\UpdateSupplierRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Supplier;

class SupplierController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Harmony/Supplier/Index');

    }

    public function create()
    {
        return Inertia::render('Harmony/Supplier/Create');
    }

    public function store(StoreSupplierRequest $request)
    {
        $validatedSupllier = $request->validated();

        Supplier::create($validatedSupllier);

        return redirect()->route('supplier.index')->with('success', 'Supplier berhasil ditambah');

    }

    public function show(Supplier $supplier)
    {

    }

    public function edit(Supplier $supplier)
    {

    }

    public function update(UpdateSupplierRequest $request, Supplier $supplier)
    {
        $validated = $request->validated();

        $supplier->update($validated);

        return redirect()->route('supplier.index')->with('success','Data supplier berhasil diperbaharui');
    }

    public function destroy(Supplier $supplier)
    {
        $supplier->delete();
        return redirect()->route('supplier.index')->with('success','Data supplier berhasil dihapus');
    }
}
