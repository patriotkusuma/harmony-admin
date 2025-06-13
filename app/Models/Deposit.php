<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Deposit extends Model
{
    use HasFactory;
    protected $guarded = [];
    public $keyType='string';
    public $incrementing= false;

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $model->id = Str::uuid();
        });
    }
}
