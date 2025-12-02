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
        Schema::create('transaction_datetime', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('model_id')->nullable();
            $table->foreignId('business_id')->nullable()->constrained('business')->nullOnDelete();
            $table->integer('tax')->nullable();
            $table->double('amount', 22, 4)->nullable();
            $table->string('tax_type')->nullable();
            $table->tinyInteger('is_tax_group')->nullable();
            $table->tinyInteger('enable_stock')->nullable();
            $table->tinyInteger('for_tax_group')->nullable();
            $table->decimal('alert_quantity', 22, 4)->nullable();
            $table->integer('created_by')->nullable();
            $table->string('sku', 191)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_datetime');
    }
};
