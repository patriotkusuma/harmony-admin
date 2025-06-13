<?php

namespace App\Http\Controllers\Api;

use App\Models\MidtransChargeResponse;
use App\Http\Requests\StoreMidtransChargeResponseRequest;
use App\Http\Requests\UpdateMidtransChargeResponseRequest;
use Illuminate\Support\Str;


class MidtransChargeResponseController extends BaseController
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
    public function store(StoreMidtransChargeResponseRequest $request)
    {
        $midtransChargeResponse = new MidtransChargeResponse();
        $midtransChargeResponse->id = Str::uuid();
        $midtransChargeResponse->status_code = $request->status_code;
        $midtransChargeResponse->status_message = $request->status_message;
        $midtransChargeResponse->transaction_id = $request->transaction_id;
        $midtransChargeResponse->order_id = $request->order_id;
        $midtransChargeResponse->gross_amount = $request->gross_amount;
        $midtransChargeResponse->currency = $request->currency;
        $midtransChargeResponse->payment_type = $request->payment_type;
        $midtransChargeResponse->transaction_time = $request->transaction_time;
        $midtransChargeResponse->fraud_status = $request->fraud_status;
        $midtransChargeResponse->actions = json_encode($request->actions);
        $midtransChargeResponse->expiry_time = $request->expiry_time;
        // dd($midtransChargeResponse);
        $midtransChargeResponse->save();

        return response()->json([
            'message' => 'Charge Response has been save successfully !',
            'success' => true,

        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(MidtransChargeResponse $midtransChargeResponse)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MidtransChargeResponse $midtransChargeResponse)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMidtransChargeResponseRequest $request, MidtransChargeResponse $midtransChargeResponse)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MidtransChargeResponse $midtransChargeResponse)
    {
        //
    }
}
