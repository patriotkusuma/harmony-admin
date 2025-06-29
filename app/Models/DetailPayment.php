<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailPayment extends Model
{
    use HasFactory;
    protected $guarded = [];

    function payments()
    {
        return $this->belongsTo(Payment::class,'id','id_payments');
    }
}
