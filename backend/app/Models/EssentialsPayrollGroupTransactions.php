<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EssentialsPayrollGroupTransactions extends Model
{
    use HasFactory;

    protected $table = 'essentials_payroll_group_transactions';

    protected function casts(): array
    {
        return [
            'updated_at' => 'datetime',
        ];
    }
}
