<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DashboardConfiguratio extends Model
{
    use HasFactory;

    protected $table = 'dashboard_configuratio';

    protected $fillable = [
        'subject',
        'top_margin',
        'alternate_number',
        'end_datetime',
    ];

    protected function casts(): array
    {
        return [
            'top_margin' => 'decimal:2',
            'end_datetime' => 'datetime',
        ];
    }
}
