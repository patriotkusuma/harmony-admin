<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class PegawaiOnOutlet extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $keyType = 'string';
    public $incrementing = false;

    public function jabatan(): BelongsTo
    {
        return $this->belongsTo(Jabatan::class, 'id_jabatan','id');
    }
    public function pegawai(): BelongsTo
    {
        return $this->belongsTo(Pegawai::class, 'id_pegawai','id');
    }

    public function outlet(): BelongsTo
    {
        return $this->belongsTo(Outlet::class, 'id_outlet','id');
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function($model){
            $model->id = Str::uuid();
        });
    }
}
