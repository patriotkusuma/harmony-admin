<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'contact_person',
        'telphone',
        'email',
        'address',
        'suppllier_type',
        'description'
    ];

    protected $casts = [
        'name' => 'string',
        'contact_person' => 'string',
        'telphone' => 'string',
        'email' => 'string',
        'address' => 'string',
    ]

    public function scopeFilter(Builder $query, array $filters)
    {
        if(!empty($filters['search'])){
            $query->where('name', 'like', '%'. $filters['search'] . '%')
                ->orWhere('contact_person', 'like', '%' . $filters['search'].'%')
                ->orWhere('telphone', 'like', '%'. $filters['search'] . '%')
                ->orWhere('email','like', '%' . $filters['search'] . '%');
        }

        if(!empty($filters['supplier_type'])){
            $query->where('supplier_type', $filters['supplier_type']);
        }
    }
}
