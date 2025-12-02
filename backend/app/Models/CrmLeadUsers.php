<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CrmLeadUsers extends Model
{
    use HasFactory;

    protected $table = 'crm_lead_users';

    protected $fillable = [
        'business_id',
        'last_name',
        'name',
        'first_name',
        'variation_template_id',
        'surname',
    ];

    protected function casts(): array
    {
        return [
            'updated_at' => 'datetime',
            'created_at' => 'datetime',
        ];
    }
}
