<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barcodes extends Model
{
    use HasFactory;

    protected $table = 'barcodes';

    protected $fillable = [
        'zip_code',
        'city',
        'user_id',
    ];

}
