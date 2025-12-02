<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Variations extends Model
{
    use HasFactory;

    protected $table = 'variations';

    protected $fillable = [
        'project_id',
        'project_task_id',
        'user_id',
        'start_datetime',
        'pp_without_discount',
        'mfg_ingredient_group_id',
        'code_1',
        'sent_by',
        'discount_percent',
        'quantity_returned',
        'code_label_2',
        'purchase_price',
        'unit_price_before_discount',
        'code_2',
        'purchase_price_inc_tax',
        'default_sales_tax',
        'is_default',
        'meta_value',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'start_datetime' => 'datetime',
            'pp_without_discount' => 'decimal:2',
            'discount_percent' => 'decimal:2',
            'quantity_returned' => 'decimal:2',
            'created_at' => 'datetime',
            'purchase_price' => 'decimal:2',
            'unit_price_before_discount' => 'decimal:2',
            'purchase_price_inc_tax' => 'decimal:2',
            'is_default' => 'boolean',
            'updated_at' => 'datetime',
        ];
    }
}
