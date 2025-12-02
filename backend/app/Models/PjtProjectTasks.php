<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PjtProjectTasks extends Model
{
    use HasFactory;

    protected $table = 'pjt_project_tasks';

    protected $fillable = [
        'location_id',
        'allocated_upto',
        'secondary_unit_id',
        'source',
        'parent_id',
        'unit_id',
        'ref_no',
        'short_code',
        'price_type',
        'type',
        'sub_unit_ids',
        'transaction_type',
        'purchase_price_inc_tax',
        'business_id',
        'invoice_no',
        'asset_id',
        'sell_price_inc_tax',
        'name',
        'customer_group_id',
        'auto_send_wa_notif',
        'price_group_id',
        'contact_id',
        'auto_send_sms',
        'variation_id',
        'adjustment_type',
        'auto_send',
    ];

    protected function casts(): array
    {
        return [
            'allocated_upto' => 'datetime',
            'updated_at' => 'datetime',
            'created_at' => 'datetime',
            'purchase_price_inc_tax' => 'decimal:2',
            'sell_price_inc_tax' => 'decimal:2',
            'auto_send_wa_notif' => 'boolean',
            'auto_send_sms' => 'boolean',
            'auto_send' => 'boolean',
        ];
    }
}
