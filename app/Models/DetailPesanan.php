<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DetailPesanan extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];

    public function pesanan(){
        return $this->belongsTo(Pesanan::class, 'id','id_pesanan');
    }

    public function jenisCuci(){
        return $this->belongsTo(JenisCuci::class, 'id_jenis_cuci', 'id');
    }
}
