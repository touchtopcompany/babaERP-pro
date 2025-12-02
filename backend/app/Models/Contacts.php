<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contacts extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'contacts';

    protected $fillable = [
        'title',
        'quotation_no_prefix',
        'decimal_separator',
        'layout',
        'invoice_no_prefix',
        'thousand_separator',
        'type',
        'header_text',
        'combo_variations',
        'symbol',
        'ip_address',
        'code',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }
}
