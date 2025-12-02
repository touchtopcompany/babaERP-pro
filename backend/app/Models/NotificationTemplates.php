<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationTemplates extends Model
{
    use HasFactory;

    protected $table = 'notification_templates';

    protected $fillable = [
        'essentials_department_id',
        'unit_price',
        'bank_account_number',
        'role_id',
        'allow_login',
        'purchase_type',
        'cheque_number',
        'max_sales_discount_percent',
        'purchase_date',
        'card_security',
        'paused_at',
        'location_id',
        'card_year',
    ];

    protected function casts(): array
    {
        return [
            'unit_price' => 'decimal:2',
            'allow_login' => 'boolean',
            'max_sales_discount_percent' => 'decimal:2',
            'purchase_date' => 'datetime',
            'paused_at' => 'datetime',
        ];
    }
}
