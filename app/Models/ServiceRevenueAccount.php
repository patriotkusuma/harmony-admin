<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceRevenueAccount extends Model
{
    /** @use HasFactory<\Database\Factories\ServiceRevenueAccountFactory> */
    use HasFactory,HasUuids;
    protected $primaryKey = 'uuid';

    protected $fillable = [
        'uuid_jenis_cuci',
        'id_revenue_account',
        'description'
    ];

    public function account(){
        return $this->belongsTo(Account::class,'id_revenue_account','id');
    }

    public function jenisCuci(){
        return $this->belongsTo(JenisCuci::class,'uuid_jenis_cuci','uuid_jenis_cuci');
    }
}
