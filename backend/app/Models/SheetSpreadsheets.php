<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SheetSpreadsheets extends Model
{
    use HasFactory;

    protected $table = 'sheet_spreadsheets';

    protected $fillable = [
        'cc',
        'business_id',
        'bcc',
        'name',
        'schedule_id',
        'created_by',
        'sheet_data',
        'user_id',
        'folder_id',
        'role_id',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
}
