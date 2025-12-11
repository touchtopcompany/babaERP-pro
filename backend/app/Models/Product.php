<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'category_id',
        'subscription_no',
        'subscription_repeat_on',
        'transaction_date',
        'total_before_tax',
        'created_by',
        'tax_id',
        'category_type',
        'tax_amount',
        'description',
        'discount_type',
        'slug',
        'discount_amount',
        'woocommerce_cat_id',
        'rp_redeemed_amount',
        'quantity',
        'model_type',
    ];

    protected function casts(): array
    {
        return [
            'transaction_date' => 'datetime',
            'total_before_tax' => 'decimal:2',
            'tax_amount' => 'decimal:2',
            'discount_amount' => 'decimal:2',
            'rp_redeemed_amount' => 'decimal:2',
            'created_at' => 'datetime',
            'quantity' => 'decimal:2',
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function variations()
    {
        return $this->hasMany(Variation::class, 'product_id');
    }
}
