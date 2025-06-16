<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Models\SumberDana;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('generate', function (){
    \Illuminate\Support\Facades\Artisan::call('storage:link');
    echo 'ok';
});

Route::get('/optimize', function(){
    return Artisan::call('optimize');
});

Route::get('/assets/{path}', function ($path) {
    return response()->file(public_path('assets/' . $path));
});
Route::get('/route-list', function(){
    return dd(Route::getRoutes());
});
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified', 'checkRole', 'userStatus'])->name('dashboard');

// Route::resource('/dashboard', \App\Http\Controllers\DashboardController::class);
Route::get('/dashboard', [DashboardController::class,'index'])->name('dashboard');

Route::middleware('auth','checkRole', 'userStatus')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('jenis-cuci', \App\Http\Controllers\JenisCuciController::class);
    Route::post('jenic-cuci/{jenis_cuci}', [\App\Http\Controllers\JenisCuciController::class, 'updateImage'])->name('jenis-cuci-image.update');
    Route::resource('customers', \App\Http\Controllers\CustomerController::class);
    Route::resource('pegawai', \App\Http\Controllers\PegawaiController::class);
    ROute::put('pegawai-password/{pegawai}', [\App\Http\Controllers\Pegawai\PegawaiPasswordController::class, 'pegawaiUpdatePassword'])->name('pegawai-password.update');
    Route::resource('dana-keluar', \App\Http\Controllers\DanaKeluarController::class);
    Route::resource('belanja-kebutuhan', \App\Http\Controllers\BelanjaKebutuhanController::class);
    Route::resource('pesanan', \App\Http\Controllers\PesananController::class);
    Route::get('pesanan-all', [\App\Http\Controllers\PesananController::class, 'pesananAll'])->name('pesanan.all');
    Route::get('print/{pesanan}', [\App\Http\Controllers\PesananController::class, 'print'])->name('pesanan.print');
    Route::get('print-nama/{customer}', [\App\Http\Controllers\CustomerController::class, 'print'])->name('customer.print');
    Route::resource('kontrakan', \App\Http\Controllers\KontrakanController::class);
    Route::resource('cart', \App\Http\Controllers\CartController::class);
    Route::post('cart-clear', [\App\Http\Controllers\CartController::class,'clearAllCart'])->name('cart.clear');
    Route::resource('category-paket', \App\Http\Controllers\CategoryPaketController::class);
    Route::resource('detail-pakaian', \App\Http\Controllers\DetailPakaianController::class);
    // Route::match(['PUT', 'PATCH'], 'detail-pakaian-jumlah/{detail-pakaian}', '\App\Http\Controllers\DetailPakaianController@updateJumlah')->name('detail-pakaian-jumlah.update');
    Route::match(['put', 'patch'],'update-jumlah/{pesanan}', [\App\Http\Controllers\DetailPakaianController::class, 'updateJumlah'])->name('update-jumlah');
    Route::get('print-pakaian/{pesanan}', [\App\Http\Controllers\DetailPakaianController::class, 'print'])->name('print-pakaian');

    Route::resource('pengambilan', \App\Http\Controllers\PengambilanController::class);
    Route::resource('sumber-dana', \App\Http\Controllers\SumberDanaController::class);

    Route::resource('inventory', \App\Http\Controllers\InventoryController::class);
    Route::resource('blog',\App\Http\Controllers\BlogController::class);

    Route::resource('outlet', \App\Http\Controllers\OutletController::class);
    Route::resource('jabatan', \App\Http\Controllers\JabatanController::class);
    Route::resource('pegawai-outlet', \App\Http\Controllers\PegawaiOnOutletController::class);

    Route::post('cabang-active', [DashboardController::class,'store'])->name('cabang.active');

    Route::resource('voucher', \App\Http\Controllers\VoucherController::class);

    // Accounting
    Route::resource('account', \App\Http\Controllers\AccountController::class);
    Route::resource('asset', \App\Http\Controllers\AssetsController::class);

});

require __DIR__ . '/auth.php';
