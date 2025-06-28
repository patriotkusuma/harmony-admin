<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\DetailPayment;
use App\Models\Notifikasi;
use App\Models\Payment;
use App\Models\Pembayaran;
use App\Models\Pesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Log;


class PembayaranController extends Controller
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
    public function store(Request $request, Pesanan $pesanan)
    {
        $pembayaran = new Pembayaran();
        $pembayaran->id_pesanan = $pesanan->id;
        $pembayaran->id_pelanggan = $pesanan->id_pelanggan;
        $pembayaran->total_pembayaran = $pesanan->total_harga;
        $pembayaran->nominal_bayar = $request->valueBayar;
        $pembayaran->kembalian = (floatval($request->valueBayar) - floatval($pesanan->total_harga));
        $pembayaran->status = 'Lunas';
        $pembayaran->save();

        $pesanan->update([
            'status_pembayaran' => 'Lunas'
        ]);

        return response()->json([
            'message' => 'pembayaran berhasil'
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pembayaran $pembayaran)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pembayaran $pembayaran)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pembayaran $pembayaran)
    {
        //
    }

    public function pesananBayar(Request $request, Customer $customer)
    {
        // dd($customer);
        try{
            $pesanan = Pesanan::where('id_pelanggan',$customer->id)->where('status_pembayaran', '!=', 'Lunas')->get();

            $bukti = '';

            // if($request->hasFile('bukti')){
            //     $extension = $request->file('bukti')->extension();
            //     $md5name = md5_file($request->file('bukti')->getRealPath());
            //     $fileName = strtolower(str_replace(' ', '_', $customer->nama)) . $md5name . '.' . $extension;
            //     $bukti = $request->file('bukti')->storeAs('/bukti', $fileName, 'uploads');
            // }
            if ($request->hasFile('bukti') && $request->file('bukti')->isValid()) {
                $file = $request->file('bukti');
                $md5name = md5_file($file->getRealPath());
                $filename = strtolower(str_replace(' ', '_', $customer->nama)) . '_' . $md5name . '.' . $file->extension();
                $path = $file->storeAs('bukti', $filename, 'public');
                $bukti = $path;
            }

            $tipePembayaran = $request->tipeBayar;
            $valueBayar = floatval($request->valueBayar);
            $sisaPembayaran = $valueBayar;
            $utang = 0;
            $dibayar =0;
            $pembayaran = [];
            $tagihan = $customer->pesananPayable()->sum('total_harga');

            $payment = new Payment();
            $payment->id_pelanggan = $customer->id;
            $payment->total_pembayaran = $tagihan;
            $payment->nominal_bayar = $valueBayar;
            $payment->kembalian = ($valueBayar - $tagihan);
            $payment->tipe = $tipePembayaran;
            $payment->bukti = $bukti != '' ? URL::asset('storage/media/' . $bukti) : '';
            $payment->save();

            $detailPayment = array();

            foreach ($pesanan as $key => $value) {
                $totalHarga = $value->total_harga;
                $dibayar = $sisaPembayaran;
                $telahBayar = $value->paid;
                $sisa = $dibayar - ($totalHarga - $telahBayar) ;
                $sisaPembayaran = $sisaPembayaran - ($totalHarga - $telahBayar);

                if($dibayar >= $totalHarga){
                    $value->update([
                        'paid' => $totalHarga,
                        'status_pembayaran' => 'Lunas'
                    ]);
                    $detailPay = new DetailPayment();
                    $detailPay->id_payment = $payment->id;
                    $detailPay->id_pesanan = $value->id;
                    $detailPay->total_bayar = $totalHarga;
                    $detailPay->kekurangan = 0;
                    $detailPay->keterangan = "ini";
                    $detailPay->save();

                    // dd($detailPay);


                }else{
                    $value->update([
                        'paid' => $value->paid > 0 ? ($value->paid + $dibayar) : $dibayar
                    ]);

                    $detailPay = new DetailPayment();

                    $detailPay->id_payment = $payment->id;
                    $detailPay->id_pesanan = $value->id;
                    $detailPay->total_bayar = $dibayar;
                    $detailPay->kekurangan = abs($dibayar - ($totalHarga - $value->paid));
                    $detailPay->keterangan = "ini";
                    $detailPay->save();
                }


                if($sisaPembayaran < 0){
                    break;
                }

            }

            // dd($data);
            return response()->json([
                'status' => 200
            ],200);
        }catch(\Exception $ex){
            dd($ex);
        }


    }

    public function autoPembayaran(Request $request) {
        // if (!$request->hasFile('bukti')) {
        //     return response()->json(['error' => 'Field bukti tidak ada atau bukan file'], 400);
        // }
    
        // $file = $request->file('bukti');
    
        // return response()->json([
        //     'originalName' => $file->getClientOriginalName(),
        //     'mime' => $file->getClientMimeType(),
        //     'size' => $file->getSize(),
        //     'isValid' => $file->isValid(),
        // ]);
        $nominal = $request->nominal;
        // $timestamp = \Carbon\Carbon::parse($request->timestamp);
        $timestamp = \Carbon\Carbon::parse($request->timestamp)->timezone('Asia/Jakarta');
        \Log::channel('webhook')->info('Timestamp setelah konversi ke WIB', [
            'timestamp_wib' => $timestamp->toDateTimeString()
        ]);
        

        $sender = $request->sender_number;
        Log::channel('webhook')->info('Webhook diterima', $request->all());



        \Log::channel('webhook')->info('Webhook Diterima', [
            'nominal' => $nominal,
            'timestamp' => $timestamp->toDateTimeString(),
            'sender' => $sender
        ]);
    
        $startTime = $timestamp->copy()->subMinutes(30);
        $endTime = $timestamp->copy()->addMinutes(30);
    
        // Log range pencarian
        \Log::channel('webhook')->info('Cari notifikasi antara', [
            'start' => $startTime,
            'end' => $endTime
        ]);

        $notifikasi = Notifikasi::whereBetween('timestamp', [$startTime, $endTime])
        ->where('nominal', $nominal)
        ->first();

            
        if(!$notifikasi){
            \Log::channel('webhook')->warning("Notifikasi tidak ditemukan", [
                'nominal' => $nominal,
                'range_start' => $startTime,
                'range_end' => $endTime
            ]);
            return response()->json([
                'message'=> "Notifikasi Tidak ditemukan"
            ],404);
        }
        $customer = Customer::where('telpon', $sender)
            ->whereHas('pesanan', function($query){
                $query->where('status_pembayaran', 'Belum Lunas');
            })
            ->first();
        
        if(!$customer){
            return response()->json([
                'message' => 'Customer Tidak Ditemukan'
            ], 404);
        }
        // Log::channel('webhook')->info('Customer Ditemukan', $customer);
        Log::channel('webhook')->info("Customer ditemukan", ['customer' => $customer->toArray()]);


        $request->merge([
            'valueBayar' => $nominal,
            'tipeBayar' => 'QRIS'
        ]);

        // dd($request);

        return $this->pesananBayar($request, $customer);

    }
}

