<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResTable extends Model
{
    use HasFactory;

    protected $table = 'res_tables';

    protected $fillable = [
        'total_label',
        'supplier_business_name',
        'state',
        'discount_label',
    ];

}
