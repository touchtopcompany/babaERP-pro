<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PjtProjectTaskComments extends Model
{
    use HasFactory;

    protected $table = 'pjt_project_task_comments';

    protected $fillable = [
        'business_id',
        'body',
    ];

}
