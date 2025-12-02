<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseLines extends Model
{
    use HasFactory;

    protected $table = 'purchase_lines';

    protected $fillable = [
        'is_default',
        'due_date',
        'is_service_staff',
        'priority',
        'description',
        'created_by',
        'status',
        'custom_field_4',
    ];

    protected function casts(): array
    {
        return [
            'updated_at' => 'datetime',
            'is_default' => 'boolean',
            'due_date' => 'datetime',
            'is_service_staff' => 'boolean',
            'created_at' => 'datetime',
        ];
    }
}
