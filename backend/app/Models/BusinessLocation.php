<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BusinessLocation extends Model
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

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'location_id');
    }

    public function repair_job_sheets()
    {
        return $this->hasMany(RepairJobSheet::class, 'location_id');
    }

    public function variation_location_deta()
    {
        return $this->hasMany(VariationLocationDeta::class, 'location_id');
    }
    }
