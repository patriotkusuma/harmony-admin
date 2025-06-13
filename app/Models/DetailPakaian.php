<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailPakaian extends Model
{
    use HasFactory;
    protected $guarded = [];


    public function pesanan(){
        return $this->belongsTo(Pesanan::class, 'id_pesanan', 'id');
    }

    public function customer(){
        return $this->belongsTo(Customer::class, 'id_pelanggan', 'id');
    }
}
