<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WhatsappSession extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'whatsapp_sessions';
    protected $primaryKey = 'id';
    protected $keyType = 'stirng';
    public $incrementing = false;

    protected $fillable = [
        'session_name',
        'client_id',
        'no_wa',
        'id_outlet',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function outlet()
    {
        return $this->belongsTo(Outlet::class, 'id_outlet', 'id');
    }
}
