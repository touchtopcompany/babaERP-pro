<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VariationLocationDeta extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'variation_location_deta';

    protected $fillable = [
        'additional_info',
        'created_by',
        'security_pwd',
        'security_pattern',
        'serial_no',
        'business_id',
        'status_id',
        'location_id',
        'delivery_date',
        'user_id',
        'product_configuration',
        'status',
        'defects',
        'closed_at',
        'product_condition',
        'closing_amount',
        'service_staff',
        'total_card_slips',
        'comment_by_ss',
        'total_cheques',
        'estimated_cost',
        'denominations',
        'closing_note',
        'parts',
        'custom_field_1',
        'product_id',
        'name',
        'product_variation_id',
        'description',
        'variation_id',
        'custom_field_3',
        'use_for_repair',
        'custom_field_4',
        'qty_available',
        'custom_field_5',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'delivery_date' => 'datetime',
            'closed_at' => 'datetime',
            'closing_amount' => 'decimal:2',
            'estimated_cost' => 'decimal:2',
            'updated_at' => 'datetime',
            'use_for_repair' => 'boolean',
            'qty_available' => 'decimal:2',
            'deleted_at' => 'datetime',
        ];
    }
}
