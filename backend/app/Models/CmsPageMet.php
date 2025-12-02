<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CmsPageMet extends Model
{
    use HasFactory;

    protected $table = 'cms_page_met';

    protected $fillable = [
        'transaction_id',
        'business_id',
        'product_custom_field8',
        'product_id',
        'tax_number_1',
        'contact_id',
        'product_custom_field9',
        'variation_id',
        'tax_label_1',
        'subject',
        'product_custom_field10',
        'tax_number_2',
        'body',
        'tax_label_2',
        'cc',
        'code_label_1',
        'bcc',
        'start_date',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'datetime',
        ];
    }
}
