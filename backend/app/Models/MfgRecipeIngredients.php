<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MfgRecipeIngredients extends Model
{
    use HasFactory;

    protected $table = 'mfg_recipe_ingredients';

    protected $fillable = [
        'description',
        'invoice_scheme_id',
        'email',
    ];

}
