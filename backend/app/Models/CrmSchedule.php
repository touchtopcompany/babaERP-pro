<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CrmSchedule extends Model
{
    use HasFactory;

    protected $table = 'crm_schedules';

    protected $fillable = [
        'content',
        'invoice_heading',
    ];

    protected function casts(): array
    {
        return [
            'updated_at' => 'datetime',
        ];
    }
}
