<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResProductModifierSets extends Model
{
    use HasFactory;

    protected $table = 'res_product_modifier_sets';

    protected $fillable = [
        'status',
        'sms_body',
        'res_table_id',
        'for_curr',
        'email_body',
        'account_id',
        'res_waiter_id',
        'template_for',
        'guard_name',
        'payment_ref_no',
        'business_id',
        'name',
        'document',
        'transaction_id',
        'note',
        'transaction_type',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
}
