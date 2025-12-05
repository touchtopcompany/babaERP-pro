<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CashRegisterTransaction extends Model
{
    use HasFactory;

    protected $table = 'cash_register_transactions';

    protected $fillable = [
        'essentials_designation_id',
    ];

}
