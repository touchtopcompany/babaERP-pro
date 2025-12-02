<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CrmProposals extends Model
{
    use HasFactory;

    protected $table = 'crm_proposals';

    protected $fillable = [
        'prefix',
    ];

}
