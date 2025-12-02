<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionSellLines extends Model
{
    use HasFactory;

    protected $table = 'transaction_sell_lines';

    protected $fillable = [
        'permission_id',
        'weight',
    ];

}
