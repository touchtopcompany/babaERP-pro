<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assets extends Model
{
    use HasFactory;

    protected $table = 'assets';

    protected $fillable = [
        'transaction_id',
        'business_id',
        'contact_id',
        'is_return',
        'user_id',
        'amount',
        'method',
    ];

    protected function casts(): array
    {
        return [
            'is_return' => 'boolean',
            'amount' => 'decimal:2',
        ];
    }
}
