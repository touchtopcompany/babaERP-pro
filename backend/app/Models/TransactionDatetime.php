<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionDatetime extends Model
{
    use HasFactory;

    protected $table = 'transaction_datetime';

    protected $fillable = [
        'model_id',
        'business_id',
        'tax',
        'amount',
        'tax_type',
        'is_tax_group',
        'enable_stock',
        'for_tax_group',
        'alert_quantity',
        'created_by',
        'sku',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'is_tax_group' => 'boolean',
            'enable_stock' => 'boolean',
            'for_tax_group' => 'boolean',
            'alert_quantity' => 'decimal:2',
        ];
    }
}
