<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepairDeviceModels extends Model
{
    use HasFactory;

    protected $table = 'repair_device_models';

    protected $fillable = [
        'final_price',
        'start_date',
        'secondary_unit_quantity',
        'business_id',
        'custom_field_3',
        'product_custom_field7',
        'subject',
    ];

    protected function casts(): array
    {
        return [
            'final_price' => 'decimal:2',
            'start_date' => 'datetime',
            'secondary_unit_quantity' => 'decimal:2',
        ];
    }
}
