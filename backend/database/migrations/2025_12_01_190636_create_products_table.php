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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->string('subscription_no', 191)->nullable();
            $table->string('subscription_repeat_on', 191)->nullable();
            $table->dateTime('transaction_date')->nullable();
            $table->decimal('total_before_tax', 22, 4)->nullable();
            $table->integer('created_by')->nullable();
            $table->integer('tax_id')->nullable();
            $table->string('category_type')->nullable();
            $table->decimal('tax_amount', 22, 4)->nullable();
            $table->text('description')->nullable();
            $table->string('discount_type')->nullable();
            $table->string('slug', 191)->nullable();
            $table->decimal('discount_amount', 22, 4)->nullable();
            $table->integer('woocommerce_cat_id')->nullable();
            $table->decimal('rp_redeemed_amount', 22, 4)->nullable();
            $table->timestamps();
            $table->decimal('quantity', 22, 4)->nullable();
            $table->string('model_type', 191)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
