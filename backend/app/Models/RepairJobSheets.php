<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RepairJobSheets extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'repair_job_sheets';

    protected $fillable = [
        'total_digits',
        'meta_key',
        'note',
        'mfg_waste_percent',
        'invoice_count',
        'cms_page_id',
        'end_datetime',
        'start_number',
        'unit_price',
        'item_tax',
        'default_profit_percent',
        'line_discount_type',
        'tax_id',
        'business_id',
        'line_discount_amount',
        'owner_id',
        'purchase_requisition_line_id',
        'location_id',
        'unit_price_inc_tax',
        'time_zone',
        'purchase_order_line_id',
        'fy_start_month',
        'contact_id',
        'name',
        'quantity_sold',
        'accounting_method',
        'job_sheet_no',
        'waiter_id',
        'quantity_adjusted',
        'service_type',
        'table_id',
        'code',
        'discount_id',
        'default_sales_discount',
        'quantity_returned',
        'pick_up_on_site_addr',
        'correspondent_id',
        'parent_id',
        'lot_no_line_id',
        'sell_price_tax',
        'po_quantity_purchased',
        'sell_line_note',
        'logo',
        'brand_id',
        'mfg_quantity_used',
        'sku_prefix',
        'device_id',
        'so_line_id',
        'mfg_date',
        'title',
        'device_model_id',
        'booking_start',
        'so_quantity_invoiced',
        'enable_product_expiry',
        'exp_date',
        'content',
        'checklist',
        'booking_end',
        'res_service_staff_id',
        'expiry_type',
        'lot_number',
        'status',
        'res_line_order_status',
        'sub_unit_id',
        'kb_type',
        'woocommerce_line_items_id',
        'parent_sell_line_id',
        'share_with',
        'children_type',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'updated_at' => 'datetime',
            'mfg_waste_percent' => 'decimal:2',
            'created_at' => 'datetime',
            'end_datetime' => 'datetime',
            'unit_price' => 'decimal:2',
            'item_tax' => 'decimal:2',
            'default_profit_percent' => 'decimal:2',
            'line_discount_amount' => 'decimal:2',
            'unit_price_inc_tax' => 'decimal:2',
            'fy_start_month' => 'boolean',
            'quantity_sold' => 'decimal:2',
            'quantity_adjusted' => 'decimal:2',
            'default_sales_discount' => 'decimal:2',
            'quantity_returned' => 'decimal:2',
            'po_quantity_purchased' => 'decimal:2',
            'deleted_at' => 'datetime',
            'mfg_quantity_used' => 'decimal:2',
            'mfg_date' => 'datetime',
            'booking_start' => 'datetime',
            'so_quantity_invoiced' => 'decimal:2',
            'enable_product_expiry' => 'boolean',
            'exp_date' => 'datetime',
            'booking_end' => 'datetime',
        ];
    }
}
