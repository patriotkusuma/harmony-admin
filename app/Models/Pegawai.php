<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pegawai extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function pesanan()
    {
        return $this->hasMany(Pesanan::class, 'id_pegawai', 'id');
    }

    public function onOutlet()
    {
        return $this->hasOne(PegawaiOnOutlet::class,'id_pegawai','id');
    }
}
