<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    private $payment;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $this->payment= Payment::query();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }

    public function transferPayment(Request $request)
    {
        $now =Carbon::now();
        $transferPayment = Payment::query();


        $firstWeek = $now->startOfWeek()->subDay(1)->toDateTimeString();
        $lastWeek = $now->addDay(1)->endOfWeek()->subDay(1)->toDateTimeString();

        $transferPayment = $transferPayment
            ->whereBetween('created_at', [$firstWeek, $lastWeek])
            ->where('tipe', 'tf');

        $payment = Payment::query();
        $payment = $payment->with('customer');
        $payment = $payment->latest();
        $payment = $payment->paginate(10)->withQueryString();
        // dd($transferPayment)
        $cashPayment = Payment::whereBetween('created_at', [$firstWeek, $lastWeek])
                ->where('tipe','cash')->sum('nominal_bayar');

        $data['cashPayment'] = $cashPayment;
        $data['transferPayment'] = $transferPayment->sum('nominal_bayar');
        $data['payment'] = $payment;
        return response()->json([
            'data'=> $data,
            'status'=> '200'
        ],200);
    }
}
