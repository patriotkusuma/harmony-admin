<?php

namespace App\Http\Controllers\Api;

use App\Models\Pesanan;
use Illuminate\Http\Request;
use SebastianBergmann\Type\NullType;
use App\Models\MidtransNotification;

use function PHPUnit\Framework\isEmpty;
use function PHPUnit\Framework\isNull;
use Illuminate\Support\Str;

class MidtransController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $client_key = "SB-Mid-client-s3OxZJVwpFUO_xcf";
        $server_key = "SB-Mid-server-ZxNbngrNwuDOczOp-dnL3nQ9";

        $hashedKey = hash('sha512', $request->order_id . $request->status_code . $request->gross_amount . $server_key);

        if($hashedKey !== $request->signature_key){
            return response()->json([
                'message' => 'Invalid Signature Key'
            ], 403);
        }



        $data = MidtransNotification::where('transaction_id', $request->transaction_id)->first();
        if(empty($data)){
            $midtransNotification = new MidtransNotification();
            $midtransNotification->id = Str::uuid();
            $midtransNotification->transaction_type = $request->transaction_type;
            $midtransNotification->transaction_time = $request->transaction_time;
            $midtransNotification->transaction_status = $request->transaction_status;
            $midtransNotification->transaction_id = $request->transaction_id;
            $midtransNotification->status_message = $request->status_message;
            $midtransNotification->status_code = $request->status_code;
            $midtransNotification->signature_key = $request->signature_key;
            $midtransNotification->settlement_time = $request->settlement_time;
            $midtransNotification->payment_type = $request->payment_type;
            $midtransNotification->order_id = $request->order_id;
            $midtransNotification->merchant_id = $request->merchant_id;
            $midtransNotification->issuer = $request->issuer;
            $midtransNotification->gross_amount = $request->gross_amount;
            $midtransNotification->fraud_status = $request->fraud_status;
            $midtransNotification->currency = $request->currency;
            $midtransNotification->aqcuirer = $request->aqcuirer;
            $midtransNotification->save();
        }

        $pesanan = Pesanan::where('kode_pesan', $request->order_id)->first();
        $transactionStatus = $request->transaction_status;
        $tagihan = $pesanan->total_harga;

        if(!$pesanan){
            return response()->json([
                'message' => 'Order Not Found'
            ], 404);
        }

        switch ($transactionStatus) {
            case 'capture':
                # code...
                break;
            case 'settlement':
                $pesanan->update([
                    'status_pembayaran' => 'Lunas',
                    'paid' => ($request->gross_amount - 1000),
                    'transaction_id' => $request->transaction_id
                ]);

                $data->update([
                    'transaction_status' => 'settlement'
                ]);
                break;
            case 'pending':
                $pesanan->update([
                    'status_pembayaran' => 'Belum Lunas',
                    'transaction_id' => $request->transaction_id
                ]);
                $data->update([
                    'transaction_status' => 'pending'
                ]);
                break;
            case 'deny':
                $pesanan->update([
                    'status_pembayaran' => 'Belum Lunas',
                    'transaction_id' => ""
                ]);
                $data->update([
                    'transaction_status' => 'deny'
                ]);
                break;
            case 'expire':
                $pesanan->update([
                    'status_pembayaran' => 'Belum Lunas',
                    'transaction_id' => ""
                ]);
                $data->update([
                    'transaction_status' => 'expire'
                ]);
                break;
            case 'cancel':
                $pesanan->update([
                    'status_pembayaran' => 'Belum Lunas',
                    'transaction_id' => ""
                ]);
                $data->update([
                    'transaction_status' => 'cancel'
                ]);
                break;

            default:
                # code...
                break;
        }


        return response()->json([
            'message' => 'Checked',
            'status' =>200
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
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

    public function charge(Request $request)
    {
        \Midtrans\Config::$serverKey = "SB-Mid-server-ZxNbngrNwuDOczOp-dnL3nQ9";
        $kodePesan = $request->kodePesan;
        $pesanan = Pesanan::where('kode_pesan',$kodePesan)->first();

        if($pesanan == NULL){
            return response()->json([
                'message' => "Pesanan Tidak Ditemukan"
            ], 200);
        }

        $params = array(
            'transaction_details' => array(
                'order_id' => $pesanan->kode_pesan,
                'gross_amount' => $pesanan->total_harga,
            ),
            'payment_type' => 'gopay',
        );

        $midtransResponse = \Midtrans\CoreApi::charge($params);

        return response()->json([
            'message' => $params,
            'response' => $midtransResponse
        ],200);
    }
}
