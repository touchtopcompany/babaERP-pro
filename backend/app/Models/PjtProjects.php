<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PjtProjects extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pjt_projects';

    protected $fillable = [
        'name',
        'business_id',
        'product_id',
        'is_dummy',
        'contact_id',
        'status',
        'essentials_salary',
        'essentials_pay_period',
        'actual_name',
        'essentials_pay_cycle',
        'short_name',
        'allow_decimal',
        'crm_contact_id',
        'base_unit_id',
        'is_cmmsn_agnt',
        'base_unit_multiplier',
        'cmmsn_percent',
        'gateway',
        'created_by',
        'selected_contacts',
        'is_advance',
        'dob',
        'gender',
        'marital_status',
        'is_allocatable',
        'description',
        'cash_register_id',
        'amount',
        'modifier_set_id',
        'type',
    ];

    protected function casts(): array
    {
        return [
            'is_dummy' => 'boolean',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'essentials_salary' => 'decimal:2',
            'allow_decimal' => 'boolean',
            'is_cmmsn_agnt' => 'boolean',
            'base_unit_multiplier' => 'decimal:2',
            'cmmsn_percent' => 'decimal:2',
            'selected_contacts' => 'boolean',
            'is_advance' => 'boolean',
            'deleted_at' => 'datetime',
            'dob' => 'datetime',
            'is_allocatable' => 'boolean',
            'amount' => 'decimal:2',
        ];
    }
}
