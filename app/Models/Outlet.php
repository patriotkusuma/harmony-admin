<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Outlet extends Model
{
    use HasFactory;
    protected $guarded = [];
    public $keyType = 'string';
    public $incrementing = false;


    public function PegawaiOnOutlet(): HasMany
    {
        return $this->hasMany(PegawaiOnOutlet::class, 'id_outlet', 'id');
    }
    public static function boot()
    {
        parent::boot();

        static::creating(function($model){
            $model->id = Str::uuid();
        });
    }
}
