<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pesanan extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];

    public function customer(){
        return $this->belongsTo(Customer::class, 'id_pelanggan', 'id');
    }

    public function detailPesanan(){
        return $this->hasMany(DetailPesanan::class, 'id_pesanan', 'id');
    }

    public function jenisCuci() {
        return $this->belongsTo(JenisCuci::class, 'id_jenis_cuci', 'id');
    }

    public function pembayaran(){
        return $this->hasMany(Pembayaran::class, 'id_pesanan', 'id');
    }

    public function detailPakaian(){
        return $this->hasMany(DetailPakaian::class, 'id_pesanan', 'id');
    }

    public function buktiPakaians()
    {
        return $this->hasMany(BuktiPakaian::class,'kode_pesan', 'kode_pesan');
    }
    // public function midtrans(){
    //     return $this->
    // }
}
