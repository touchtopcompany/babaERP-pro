<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupSubTaxes extends Model
{
    use HasFactory;

    protected $table = 'group_sub_taxes';

    protected $fillable = [
        'product_id',
        'business_id',
        'group_tax_id',
        'variation_id',
        'name',
        'tax_id',
        'instructions',
        'repair_checklist',
        'waste_percent',
        'brand_id',
        'ingredients_cost',
        'device_id',
        'extra_cost',
        'created_by',
        'production_cost_type',
        'total_quantity',
    ];

    protected function casts(): array
    {
        return [
            'waste_percent' => 'decimal:2',
            'ingredients_cost' => 'decimal:2',
            'extra_cost' => 'decimal:2',
            'created_at' => 'datetime',
            'total_quantity' => 'decimal:2',
            'updated_at' => 'datetime',
        ];
    }
}
