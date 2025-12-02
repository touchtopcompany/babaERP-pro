<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VariationTemplates extends Model
{
    use HasFactory;

    protected $table = 'variation_templates';

    protected $fillable = [
        'name',
        'meta_description',
        'sub_heading_line1',
        'business_id',
        'tags',
        'sub_heading_line2',
        'woocommerce_attr_id',
        'feature_image',
        'sub_heading_line3',
        'priority',
        'sub_heading_line4',
        'created_by',
        'sub_heading_line5',
        'is_enabled',
        'invoice_heading_not_paid',
        'invoice_heading_paid',
        'tax_label',
        'sort_order',
        'prefix',
        'first_name',
        'contact_id',
        'is_completed_status',
        'middle_name',
        'title',
        'sms_template',
        'last_name',
        'status',
        'email_subject',
        'email',
        'start_datetime',
        'email_body',
        'end_datetime',
        'contact_status',
        'description',
        'tax_number',
        'address_line_2',
        'notify_type',
        'zip_code',
        'dob',
        'is_recursive',
        'mobile',
        'recursion_days',
        'landline',
        'followup_additional_info',
        'alternate_number',
        'follow_up_by',
        'pay_term_number',
        'follow_up_by_value',
        'pay_term_type',
        'location_id',
        'credit_limit',
        'converted_by',
        'width',
        'country',
        'converted_on',
        'height',
        'state',
        'balance',
        'paper_width',
        'paper_height',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'is_enabled' => 'boolean',
            'is_completed_status' => 'boolean',
            'start_datetime' => 'datetime',
            'end_datetime' => 'datetime',
            'dob' => 'datetime',
            'is_recursive' => 'boolean',
            'credit_limit' => 'decimal:2',
            'width' => 'decimal:2',
            'converted_on' => 'datetime',
            'height' => 'decimal:2',
            'balance' => 'decimal:2',
            'paper_width' => 'decimal:2',
            'paper_height' => 'decimal:2',
        ];
    }
}
