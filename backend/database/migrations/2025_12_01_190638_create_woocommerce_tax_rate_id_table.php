<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('woocommerce_tax_rate_id', function (Blueprint $table) {
            $table->id();
            $table->string('barcode_type')->nullable();
            $table->softDeletes();
            $table->decimal('expiry_period', 4, 2)->nullable();
            $table->timestamps();
            $table->string('product_custom_field3', 191)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('woocommerce_tax_rate_id');
    }
};
