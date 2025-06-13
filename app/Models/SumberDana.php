<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SumberDana extends Model
{
    use HasFactory;
    protected $guarded = [];

    function belanjaKebutuhan () {
        return $this->hasMany(BelanjaKebutuhan::class, 'sumber_dana_id', 'id');
    }
}
