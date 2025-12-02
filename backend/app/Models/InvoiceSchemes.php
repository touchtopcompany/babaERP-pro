<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceSchemes extends Model
{
    use HasFactory;

    protected $table = 'invoice_schemes';

    protected $fillable = [
        'user_id',
        'business_id',
        'name',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
}
