<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WoocommerceTaxRateId extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'woocommerce_tax_rate_id';

    protected $fillable = [
        'barcode_type',
        'expiry_period',
        'product_custom_field3',
    ];

    protected function casts(): array
    {
        return [
            'deleted_at' => 'datetime',
            'expiry_period' => 'decimal:2',
            'created_at' => 'datetime',
        ];
    }
}
