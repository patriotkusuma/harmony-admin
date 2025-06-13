<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;
    protected $guarded =[];

    function pegawai(){
        return $this->belongsTo(User::class,'user_id', 'id');
    }
}
