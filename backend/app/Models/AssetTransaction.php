<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AssetTransaction extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'asset_transactions';

    protected $fillable = [
        'sub_type',
        'is_quotation',
        'cc',
        'sub_status',
        'subject',
        'res_order_status',
        'platform',
        'whatsapp_text',
    ];

    protected function casts(): array
    {
        return [
            'is_quotation' => 'boolean',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }
}
