<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MfgRecipe extends Model
{
    use HasFactory;

    protected $table = 'mfg_recipes';

    protected $fillable = [
        'product_custom_field4',
        'task_id',
        'guard_name',
        'custom_field_2',
        'quantity',
        'name',
        'custom_field_1',
        'project_id',
        'parent_id',
        'product_custom_field2',
        'reason',
        'product_custom_field1',
    ];

    protected function casts(): array
    {
        return [
            'updated_at' => 'datetime',
            'quantity' => 'decimal:2',
        ];
    }
}
