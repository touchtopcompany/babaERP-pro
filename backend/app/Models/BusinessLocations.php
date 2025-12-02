<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BusinessLocations extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'business_locations';

    protected $fillable = [
        'name',
        'show_client_id',
        'description',
        'client_id_label',
        'created_by',
        'client_tax_label',
        'date_label',
        'date_time_format',
    ];

    protected function casts(): array
    {
        return [
            'show_client_id' => 'boolean',
            'deleted_at' => 'datetime',
            'created_at' => 'datetime',
        ];
    }
}
