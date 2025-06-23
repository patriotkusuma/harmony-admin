<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notifikasi extends Model
{
    use HasFactory, HasUuids;
    protected $table = "notifikasi";
    protected $keyType = 'string';
    protected $primaryKey = "id";

    protected $fillable = [
        "title",
        "text",
        "nominal",
        "package_name",
        "timestamp"
    ];


}
