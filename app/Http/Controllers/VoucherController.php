<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use App\Http\Requests\StoreVoucherRequest;
use App\Http\Requests\UpdateVoucherRequest;
use Inertia\Inertia;

class VoucherController extends Controller
{

    private $vouchers;

    public function __construct()
    {
        $this->vouchers = Voucher::query();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vouchers = $this->vouchers
            ->paginate(10)->withQueryString();
        return Inertia::render('Harmony/Voucher/Index', compact([
            'vouchers'
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
    public function store(StoreVoucherRequest $request)
    {
        try{
            $this->vouchers->create($request->all());
            return back()->with('success', 'Voucher berhasil disimpan');
        }catch(\Exception $ex){
            return back()->with('error', 'Gagal Simpan Voucher');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Voucher $voucher)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Voucher $voucher)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVoucherRequest $request, Voucher $voucher)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Voucher $voucher)
    {
        //
    }
}
