<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'contacts';

    protected $fillable = [
        'title',
        'quotation_no_prefix',
        'decimal_separator',
        'layout',
        'invoice_no_prefix',
        'thousand_separator',
        'type',
        'header_text',
        'combo_variations',
        'symbol',
        'ip_address',
        'code',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }

    public function assets()        
    {
        return $this->hasMany(Asset::class, 'contact_id');
    }

    
    public function variation_templates()
    {
        return $this->hasMany(VariationTemplate::class, 'contact_id');
    }

    public function assets()
    {
        return $this->hasMany(Asset::class, 'contact_id');
    }

    public function pjt_projects()
    {
        return $this->hasMany(PjtProject::class, 'contact_id');
    }

    public function cms_page_met()
    {
        return $this->hasMany(CmsPageMet::class, 'contact_id');
    }

    public function pjt_project_tasks()
    {
        return $this->hasMany(PjtProjectTask::class, 'contact_id');
    }
    }
