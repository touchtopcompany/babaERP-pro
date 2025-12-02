<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PjtProjectMembers extends Model
{
    use HasFactory;

    protected $table = 'pjt_project_members';

    protected $fillable = [
        'project_id',
        'sub_unit_id',
    ];

}
