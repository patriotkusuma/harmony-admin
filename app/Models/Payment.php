<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $table = 'payments';


    function detailPayment(){
        return $this->hasMany(detailPayment::class,'id_payments','id');
    }

    function customer(){
        return $this->belongsTo(Customer::class, 'id_pelanggan', 'id');
    }

}
