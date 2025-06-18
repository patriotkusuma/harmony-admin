<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisCuci extends Model
{
    use HasFactory;
    protected $guarded = [];


    public function categoryPaket(){
        return $this->belongsTo(CategoryPaket::class, 'id_category_paket', 'id');
    }

    public function serviceRevenueAccount()
    {
        return $this->hasMany(ServiceRevenueAccount::class, 'uuid_jenis_cuci','uuid_jenis_cuci');
    }
}
