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
        Schema::create('repair_device_models', function (Blueprint $table) {
            $table->id();
            $table->decimal('final_price', 22, 4)->nullable();
            $table->date('start_date')->nullable();
            $table->decimal('secondary_unit_quantity')->nullable();
            $table->foreignId('business_id')->nullable()->constrained('business')->nullOnDelete();
            $table->string('custom_field_3')->nullable();
            $table->string('product_custom_field7', 191)->nullable();
            $table->string('subject', 191)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repair_device_models');
    }
};
