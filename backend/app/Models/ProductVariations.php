<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariations extends Model
{
    use HasFactory;

    protected $table = 'product_variations';

    protected $fillable = [
        'variation_template_id',
    ];

}
