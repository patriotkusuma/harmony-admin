<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'account_name',
        'account_type',
        'initial_balance',
        'current_balance',
        'description',
    ];

    protected $casts = [
        'initial_balance' => 'double',
        'current_balance' => 'double',
    ];

    public function scopeFilter(Builder $query, array $filters)
    {
        if(!empty($filters['search'])){
            $query->where('account_name', 'like', '%' . $filters['search'] . '%');
        }

        if(!empty($filters['account_type'])){
            $query->where('account_type', $filters['account_type']);
        }
    }
}
