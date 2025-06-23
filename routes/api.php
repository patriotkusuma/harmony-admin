<?php

use App\Http\Controllers\Api\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::domain("api.harmonylaundry.my.id")->group(function () {
    Route::controller(RegisterController::class)->group(function () {
        Route::post('login', 'login');
    });

    Route::post('midtrans-webhook', [\App\Http\Controllers\Api\MidtransController::class, 'store'])->name('midtrans-webhook');

    Route::middleware(['auth:sanctum', 'abilities:check-status,place-order'])->group(function () {
        // BUkti cucian
        Route::post('/bukti-cucian', [\App\Http\Controllers\Api\BuktiPakaianController::class,'store'])
            ->name('bukti-cucian');

        Route::post('halo-cuk', function(){
            dd('cukcok');
        });

        Route::post('/user-logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);
        Route::resource('order', \App\Http\Controllers\Api\PesananController::class)->parameters([
            'order' => 'pesanan:kode_pesan'
        ]);
        Route::get('/urutan-kerja', [\App\Http\Controllers\Api\PesananController::class, 'urutanPengerjaan'])->name('order.urutan');
        Route::get('/ambil-pesanan', [\App\Http\Controllers\Api\PesananController::class, 'ambilSekarang'])->name('ambil-sekarangg');
        Route::get('/last-order', [\App\Http\Controllers\Api\PesananController::class, 'lastOrder'])->name('order.last');
        Route::resource('category', \App\Http\Controllers\Api\CategoryController::class);

        Route::resource('paket-cart', \App\Http\Controllers\Api\CartController::class);
        Route::post('/paket-cart-clear', [\App\Http\Controllers\Api\CartController::class, 'clearAllCart'])->name('paket-cart.clear');
        Route::resource('pakaian', \App\Http\Controllers\Api\DetailPakaianController::class);
        Route::resource('pelanggan', \App\Http\Controllers\Api\CustomerController::class);
        Route::get('pelanggan-bayar', [\App\Http\Controllers\Api\CustomerController::class, 'customerPayable'])->name('pelanggan.bayar');
        Route::post('pesanan-bayar-auto', [\App\Http\Controllers\Api\PembayaranController::class, 'autoPembayaran'])->name('auto-pembayaran');
        Route::post('pesanan-bayar/{customer:id}', [\App\Http\Controllers\Api\PembayaranController::class, 'pesananBayar'])->name('pesanan.bayar');
        Route::post('/pelanggan-bayar/{pesanan:kode_pesan}', [\App\Http\Controllers\Api\PembayaranController::class, 'store'])->name('pembayaran-pelanggan');

        Route::get('transfer-payment', [\App\Http\Controllers\Api\PaymentController::class, 'transferPayment'])->name('transfer.payment');

        Route::post('midtrans-charge',[\App\Http\Controllers\Api\MidtransController::class, 'charge'])->name('midtrans-charge');
        // Print Nama
        // Route::get('/user', function (Request $request) {
        //     return $request->user()->load('pegawai', 'pegawai.pesanan', 'pegawai.onOutlet','pegawai.onOutlet.outlet');
        // });
        Route::get('/user', [\App\Http\Controllers\Api\RegisterController::class, 'getUser'])->name('get.user');
        Route::get('/cur-user', function (Request $request) {
            return response()->json([
                'message' => 'Hallo Boss'
            ]);
        });

        // Outlet
        Route::resource('outlet', \App\Http\Controllers\Api\OutletController::class);
    });


    Route::post('print-nama', [\App\Http\Controllers\Api\PrintController::class, 'printNama'])->name('print.nama');
    Route::post('print-pesanan', [\App\Http\Controllers\Api\PrintController::class, 'printPesanan'])->name('print.pesanan');
    Route::post('print-order', [\App\Http\Controllers\Api\PrintController::class, 'printOrder'])->name('print.order');
    Route::post('print-order-last', [\App\Http\Controllers\Api\PrintController::class, 'lastOrder'])->name('print.order-last');
    Route::post('print-pakaian', [\App\Http\Controllers\Api\PrintController::class, 'printPakaian'])->name('print.pakaian');

    Route::get('pesan/{kode_pesan}', [\App\Http\Controllers\Api\PesananController::class, 'show']);
    Route::get('/konten', [\App\Http\Controllers\Api\BlogController::class, 'index'])->name('kontent.index');
    Route::get('/konten/{slug}', [\App\Http\Controllers\Api\BlogController::class, 'show'])->name('kontent.show');

    Route::post('kirim-invoice/{pesanan:kode_pesan}', [\App\Http\Controllers\Api\NotificationController::class, 'invoice'])->name('kirim.invoice');
    Route::post('kirim-notif/{pesanan:kode_pesan}', [\App\Http\Controllers\Api\NotificationController::class, 'notif'])->name('kirim.notif');

    Route::post('/midtrans-save-charge', [\App\Http\Controllers\Api\MidtransChargeResponseController::class, 'store'])->name('midtrans-save-charge');

    Route::get('/skuy', function () {
        return "skuy";
    });

    // Route::middleware('optimizeImages')->group(function(){

    // });
    Route::get('/check-connection', function (Request $request) {
        return response()->json([
            'message' => 'Connection OK',
            'status' => 200
        ], 200);
    });
});
