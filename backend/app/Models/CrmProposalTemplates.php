<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CrmProposalTemplates extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'crm_proposal_templates';

    protected $fillable = [
        'business_id',
        'name',
        'transaction_id',
        'project_task_id',
        'package_id',
        'product_id',
        'task',
        'comment',
        'start_date',
        'sub_sku',
        'description',
        'commented_by',
        'connection_type',
        'trial_end_date',
        'product_variation_id',
        'rate',
        'capability_profile',
        'end_date',
        'woocommerce_variation_id',
        'tax_rate_id',
        'char_per_line',
        'package_price',
        'variation_value_id',
        'quantity',
        'package_details',
        'default_purchase_price',
        'total',
        'port',
        'created_id',
        'dpp_inc_tax',
        'path',
        'paid_via',
        'profit_percent',
        'created_by',
        'payment_transaction_id',
        'default_sell_price',
        'status',
        'sell_price_inc_tax',
        'country',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'datetime',
            'trial_end_date' => 'datetime',
            'rate' => 'decimal:2',
            'created_at' => 'datetime',
            'end_date' => 'datetime',
            'updated_at' => 'datetime',
            'package_price' => 'decimal:2',
            'quantity' => 'decimal:2',
            'default_purchase_price' => 'decimal:2',
            'total' => 'decimal:2',
            'dpp_inc_tax' => 'decimal:2',
            'profit_percent' => 'decimal:2',
            'default_sell_price' => 'decimal:2',
            'sell_price_inc_tax' => 'decimal:2',
            'deleted_at' => 'datetime',
        ];
    }
}
