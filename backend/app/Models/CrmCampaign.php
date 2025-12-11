<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CrmCampaign extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'crm_campaigns';

    protected $fillable = [
        'on_product_expiry',
        'email_body',
        'sms_body',
        'sent_on',
        'contact_ids',
    ];

    protected function casts(): array
    {
        return [
            'sent_on' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }
}
