<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PriceGroups extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'price_groups';

    protected $fillable = [
        'name',
        'description',
        'business_id',
        'is_active',
        'created_by',
        'booking_status',
        'booking_note',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'deleted_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
}
