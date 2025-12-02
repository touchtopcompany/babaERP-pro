<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EssentialsKb extends Model
{
    use HasFactory;

    protected $table = 'essentials_kb';

    protected $fillable = [
        'stop_selling_before',
        'business_id',
        'enable_tooltip',
        'name',
        'purchase_in_diff_currency',
        'campaign_type',
        'purchase_currency_id',
        'subject',
        'p_exchange_rate',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'enable_tooltip' => 'boolean',
            'purchase_in_diff_currency' => 'boolean',
            'p_exchange_rate' => 'decimal:2',
            'updated_at' => 'datetime',
        ];
    }
}
