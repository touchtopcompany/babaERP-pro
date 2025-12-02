<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerGroups extends Model
{
    use HasFactory;

    protected $table = 'customer_groups';

    protected $fillable = [
        'landmark',
        'city',
        'notify_before',
        'location_id',
        'paid_label',
        'name',
        'address_line_1',
        'business_id',
        'total_due_label',
        'notify_via',
        'round_off_label',
        'color',
        'country',
    ];

}
