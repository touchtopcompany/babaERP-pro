<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
    use HasFactory;

    protected $table = 'transactions';

    protected $fillable = [
        'payment_for',
        'pay_method',
        'location_id',
        'paid_through_link',
        'model_id',
        'business_id',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'updated_at' => 'datetime',
            'created_at' => 'datetime',
            'paid_through_link' => 'boolean',
        ];
    }
}
