<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CrmScheduleLogs extends Model
{
    use HasFactory;

    protected $table = 'crm_schedule_logs';

    protected $fillable = [
        'schedule_id',
        'log_type',
        'start_datetime',
        'sale_invoice_scheme_id',
        'row_distance',
        'invoice_layout_id',
        'col_distance',
        'sale_invoice_layout_id',
        'stickers_in_one_row',
        'selling_price_group_id',
        'is_default',
        'print_receipt_on_invoice',
        'is_continuous',
        'receipt_printer_type',
        'stickers_in_one_sheet',
        'printer_id',
        'business_id',
        'mobile',
        'featured_products',
        'created_by',
        'mfg_recipe_id',
        'is_active',
        'name',
        'variation_id',
        'common_settings',
        'color',
        'mfg_ingredient_group_id',
        'default_payment_accounts',
        'configuration',
        'quantity',
        'custom_field1',
        'waste_percent',
        'custom_field2',
        'sub_unit_id',
        'custom_field3',
        'sort_order',
        'custom_field4',
        'accounting_default_map',
    ];

    protected function casts(): array
    {
        return [
            'start_datetime' => 'datetime',
            'row_distance' => 'decimal:2',
            'col_distance' => 'decimal:2',
            'is_default' => 'boolean',
            'print_receipt_on_invoice' => 'boolean',
            'is_continuous' => 'boolean',
            'created_at' => 'datetime',
            'is_active' => 'boolean',
            'quantity' => 'decimal:2',
            'waste_percent' => 'decimal:2',
            'updated_at' => 'datetime',
        ];
    }
}
