<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function pesanan (){
        return $this->hasMany(Pesanan::class, 'id_pelanggan','id');
    }

    public function pesananPayable($kodePesan = "", $idOutlet = ""){
        return $this->hasMany(Pesanan::class,'id_pelanggan', 'id')->where('status_pembayaran','!=', 'Lunas')
        ->where("status", "!=", "batal")
        ->where("kode_pesan", "!=", $kodePesan);
    }

    public function pesananTakeable(){
        return $this->hasMany(Pesanan::class, 'id_pelanggan', 'id')->where('status', '!=','diambil')
        ->where("status", "!=","batal");
    }
}
