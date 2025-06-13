<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryPaket extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function paketCuci(){
        return $this->hasMany(JenisCuci::class,'id_category_paket', 'id')->orderBy('order');
    }
}
