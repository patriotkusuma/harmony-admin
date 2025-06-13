<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pembayaran extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];

    public function pesanan(){
        return $this->hasOne(Pesanan::class, 'id', 'id_pesanan');
    }

    public function pelanggan(){
        return $this->belongsTo(Customer::class, 'id', 'id_pelanggan');
    }
}
