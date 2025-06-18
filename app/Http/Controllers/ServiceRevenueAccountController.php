<?php

namespace App\Http\Controllers;

use App\Models\ServiceRevenueAccount;
use App\Http\Requests\StoreServiceRevenueAccountRequest;
use App\Http\Requests\UpdateServiceRevenueAccountRequest;

class ServiceRevenueAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreServiceRevenueAccountRequest $request)
    {
        $validated = $request->validated();
        ServiceRevenueAccount::create($validated);

        return redirect()->back()->with('success','Data berhasil ditautkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(ServiceRevenueAccount $serviceRevenueAccount)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ServiceRevenueAccount $serviceRevenueAccount)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRevenueAccountRequest $request, ServiceRevenueAccount $serviceRevenueAccount)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServiceRevenueAccount $serviceRevenueAccount)
    {
        //
    }
}
