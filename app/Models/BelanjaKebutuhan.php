<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\DanaKeluar;
use Carbon\Carbon;

class BelanjaKebutuhan extends Model
{
    use HasFactory;
    protected $guarded = [];

    protected function danaKeluar()
    {
        return $this->belongsTo(DanaKeluar::class, 'id_dana_keluar', 'id');
    }
}
