<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bookings extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'bookings';

    protected $fillable = [
        'custom_field_2',
    ];

    protected function casts(): array
    {
        return [
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }
}
