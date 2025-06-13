<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Jabatan extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = [];
    protected $keyType = 'string';
    public $incrementing=false;


    public function pegawaiOnOutlet(): HasMany
    {
        return $this->hasMany(pegawaiOnOutlet::class);
    }

    public static function boot(){
        parent::boot();

        static::creating(function($model){
            $model->id = Str::uuid();
        });
    }
}
