<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    use HasFactory;

    protected $table = 'business';

    protected $fillable = [
        'scheme_type',
        'product_custom_field5',
        'name',
        'product_custom_field6',
        'currency_id',
        'number_type',
    ];

}
