<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EssentialsPayrollGroups extends Model
{
    use HasFactory;

    protected $table = 'essentials_payroll_groups';

    protected $fillable = [
        'name',
        'allow_notification',
        'sub_total_label',
        'type',
        'followup_category_id',
        'quotation_heading',
        'schedule_type',
        'business_id',
    ];

    protected function casts(): array
    {
        return [
            'allow_notification' => 'boolean',
            'updated_at' => 'datetime',
            'created_at' => 'datetime',
        ];
    }
}
