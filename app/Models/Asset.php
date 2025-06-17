<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'assets';

    // Kolom yang boleh diisi secara massal
    protected $fillable = [
        'id_outlet',
        'asset_name',
        'purchase_date',
        'purchase_price',
        'depreciation_method',
        'usefull_live_years',
        'savage_value',
        'accumulated_depreciation',
        'current_book_value',
        'description',
        'status',
        'last_depreciation_date'
    ];

    // Casting tipe data saat ambil/simpan dari/ke database
    protected $casts = [
        'asset_name' => 'string',
        'purchase_date' => 'date',
        'purchase_price' => 'float',
        'depreciation_method' => 'string',
        'usefull_live_years' => 'integer',
        'savage_value' => 'float',
        'accumulated_depreciation' => 'float',
        'current_book_value' => 'float',
        'description' => 'string',
        'id_outlet' => 'string',
        'last_depreciation_date' => 'date'
    ];

    public function outlet()
    {
        return $this->belongsTo(Outlet::class, 'id_outlet','id');
    }

    public function scopeFilter(Builder $query, array $filters)
    {
        if(!empty($filters['search'])){
            $query->where('asset_name', 'like', '%' . $filters['search'] . '%');
        }

        if(!empty($filters['start_date']) || !empty($filters['end_date'])){
            $startDate = $filters['start_date'] ?? Carbon::now()->toDateString();
            $endDate = $filters['end_date'] ?? Carbon::now()->toDateString();
            $query->whereBetween('purchase_date', [$startDate, $endDate]);
        }
    }
}
