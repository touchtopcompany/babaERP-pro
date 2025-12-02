<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PjtProjectTaskMembers extends Model
{
    use HasFactory;

    protected $table = 'pjt_project_task_members';

    protected $fillable = [
        'show_time',
        'show_brand',
        'project_task_id',
        'show_sku',
        'show_cat_code',
        'business_id',
        'name',
        'status',
        'amount',
        'payment_status',
        'price_calculation_type',
        'gross_total',
        'selling_price_group_id',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'show_time' => 'boolean',
            'show_brand' => 'boolean',
            'show_sku' => 'boolean',
            'show_cat_code' => 'boolean',
            'amount' => 'decimal:2',
            'gross_total' => 'decimal:2',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
}
