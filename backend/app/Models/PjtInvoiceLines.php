<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PjtInvoiceLines extends Model
{
    use HasFactory;

    protected $table = 'pjt_invoice_lines';

    protected $fillable = [
        'subject',
    ];

}
