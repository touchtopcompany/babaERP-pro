<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    use HasFactory;

    protected $table = 'business';

    protected $fillable = [
        'scheme_type',
        'product_custom_field5',
        'name',
        'product_custom_field6',
        'currency_id',
        'number_type',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    // Relationships
    public function assets()
    {
        return $this->hasMany(Asset::class, 'business_id');
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'business_id');
    }

    public function crmProposalTemplates()
    {
        return $this->hasMany(CrmProposalTemplate::class, 'business_id');
    }

    public function sheetSpreadsheets()
    {
        return $this->hasMany(SheetSpreadsheet::class, 'business_id');
    }

    public function variationTemplates()
    {
        return $this->hasMany(VariationTemplate::class, 'business_id');
    }

    public function crmScheduleLogs()
    {
        return $this->hasMany(CrmScheduleLog::class, 'business_id');
    }

    public function pjtProjects()
    {
        return $this->hasMany(PjtProjects::class, 'business_id');
    }

    public function transactionDatetime()
    {
        return $this->hasMany(TransactionDatetime::class, 'business_id');
    }

    public function invoiceSchemes()
    {
        return $this->hasMany(InvoiceScheme::class, 'business_id');
    }

    public function cmsPageMet()
    {
        return $this->hasMany(CmsPageMet::class, 'business_id');
    }

    public function crmLeadUsers()
    {
        return $this->hasMany(CrmLeadUser::class, 'business_id');
    }

    public function customerGroups()
    {
        return $this->hasMany(CustomerGroup::class, 'business_id');
    }

    public function essentialsPayrollGroups()
    {
        return $this->hasMany(EssentialsPayrollGroup::class, 'business_id');
    }

    public function repairJobSheets()
    {
        return $this->hasMany(RepairJobSheet::class, 'business_id');
    }

    public function essentialsKb()
    {
        return $this->hasMany(EssentialsKb::class, 'business_id');
    }

    public function variationLocationDeta()
    {
        return $this->hasMany(VariationLocationDeta::class, 'business_id');
    }

    public function priceGroups()
    {
        return $this->hasMany(PriceGroup::class, 'business_id');
    }
}
