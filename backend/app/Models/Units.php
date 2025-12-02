<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Units extends Model
{
    use HasFactory;

    protected $table = 'units';

    protected $fillable = [
        'depreciation',
        'paid_on',
        'model_type',
    ];

    protected function casts(): array
    {
        return [
            'depreciation' => 'decimal:2',
            'paid_on' => 'datetime',
        ];
    }
}
