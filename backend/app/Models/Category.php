<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = [
        'name',
        'user_type',
        'transaction_id',
        'payroll_group_id',
        'created_by',
        'left_margin',
        'website',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'left_margin' => 'decimal:2',
        ];
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }
    
    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }
    }
