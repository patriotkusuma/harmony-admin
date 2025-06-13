<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DatabaseStorageModel;
use App\Models\JenisCuci;
use Carbon\Carbon;
use Illuminate\Http\Request;


class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = auth()->user()->id;
        $cartItems =  \Cart::session($userId)->getContent();
        $subTotal = \Cart::session($userId)->getSubtotal() != "" ? round(\Cart::session($userId)->getSubtotal()) : "";

        $harga = ($subTotal/1000);
        $whole = floor($harga);
        $totalHarga = $harga - $whole;

        switch ($totalHarga) {
            case $totalHarga < 0.4:
                $totalHarga = round($harga, 0, PHP_ROUND_HALF_DOWN);
                break;

            case $totalHarga > 0.7:
                $totalHarga = round($harga, 0, PHP_ROUND_HALF_UP);
                break;

            default:
                $totalHarga = $whole + 0.5;
                break;
        }

        $subTotal = $totalHarga * 1000;
        $estimasiSelesai = Carbon::now()->addDay(1)->toDateTimeString();

        if($cartItems != null){
            $cartAttributes = [];

            foreach ($cartItems as $key => $value) {
                if($value->attributes->has('tanggal_selesai')){
                    $cartAttributes[] = (int)$value->attributes->tanggal_selesai;
                }
            }
            $estimasiSelesai = $cartAttributes != null ? date('Y-m-d H:i:s',max($cartAttributes)) : Carbon::now()->addDay(1)->toDateString();


        }

        $data['cart_items'] = $cartItems;
        $data['subTotal'] = $subTotal;
        $data['estimasiSelesai'] = $estimasiSelesai;

        return response()->json([
            'data' =>  $data,
            'message' => "Fetch all cart",
            'status' => 200
        ], 200);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $jenisCuci = JenisCuci::find($request->idJenisCuci);

        $estimasiSelesai = Carbon::now();
        $tanggalSelesai = $jenisCuci->categoryPaket;

        switch ($tanggalSelesai->tipe_durasi) {
            case 'hari':
                $estimasiSelesai = $estimasiSelesai->addDay($tanggalSelesai->durasi);
                break;

            default:
                $estimasiSelesai = $estimasiSelesai->addHour($tanggalSelesai->durasi);
                break;
        }
        $price = 0;
        $quantity= 0;

        switch ($jenisCuci->tipe) {
            case 'per_kilo':
                $price = ($jenisCuci->harga/1000);
                $quantity = 2000;
                break;
            case 'kilo_meter':
                $price = ($jenisCuci->harga/1000);
                $quantity = 2000;
                break;
            case 'meter':
                $price = ($jenisCuci->harga/1000);
                $quantity = 2000;
                break;


            default:
                $price = $jenisCuci->harga;
                $quantity =1;
                break;
        }

        $userId = auth()->user()->id;
        \Cart::session($userId)->add([
            'id' => $jenisCuci->id,
            'name' => $jenisCuci->nama,
            'price' => $price,
            'quantity' => $quantity,
            'attributes' => array(
                'image' => $jenisCuci->gambar,
                'category_paket' => $jenisCuci->categoryPaket->nama,
                'tanggal_selesai' => $estimasiSelesai->timestamp,
            )
        ]);

        return response()->json([
            'message' => "cart added successfully.",
            'status' => 200,
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(DatabaseStorageModel $databaseStorageModel)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, String $id)
    {
        $userId = auth()->user()->id;

        \Cart::session($userId)->update(
            $id,
            [
                'quantity' => [
                    'relative' => false,
                    'value' => $request->qty
                ]
            ]
        );

        return response()->json([
            'message' => 'Cart updated successfully',
            'status' => 200,
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(String $id)
    {
        $userId = auth()->user()->id;
        \Cart::session($userId)->remove($id);
        return response()->json([
            'message' => 'Cart ' . $id. ' removed successfully',
            'status' => 200,
        ], 200);
    }

    public function clearAllCart()
    {

        $userId = auth()->user()->id;

        \Cart::session($userId)->clear();

        return response()->json([
            'message' => 'All cart cleared.',
            'status' => 200,
        ],200);
    }
}
