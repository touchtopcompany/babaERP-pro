<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SheetSpreadsheetShares extends Model
{
    use HasFactory;

    protected $table = 'sheet_spreadsheet_shares';

    protected $fillable = [
        'sheet_spreadsheet_id',
        'shared_with',
        'shared_id',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
}
