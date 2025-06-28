<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WhatsappMessage extends Model
{
    use HasFactory, HasUuids;
    protected $table = "whatsapp_messages";
    protected $primaryKey="id";
    protected $keyType = "string";
    public $incrementing = false;

    protected $fillable = [
        'id',
        'message_id',
        'sender_no',
        'receiver_no',
        'from_customer',
        'is_group',
        'message_type',
        'message_content',
        'media_url',
        'timestamp',
        'status',
        'uuid_customer',
        'id_outlet'
    ];

    protected $casts = [
        'from_customer'=>'boolean',
        'is_group'=> 'boolean',
        'timestamp' => 'datetime'
    ];

    public function customer() {
        return $this->belongsTo(Customer::class, 'uuid_customer', 'uuid_customer');
    
    }

    public function outlet(){
        return $this->belongsTo(Outlet::class, 'id_outlet', 'id');
    }
}
