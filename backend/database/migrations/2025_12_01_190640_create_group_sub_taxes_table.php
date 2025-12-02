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
        Schema::create('group_sub_taxes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->foreignId('business_id')->nullable()->constrained('business')->nullOnDelete();
            $table->integer('group_tax_id')->nullable();
            $table->integer('variation_id')->nullable();
            $table->string('name', 191)->nullable();
            $table->integer('tax_id')->nullable();
            $table->text('instructions')->nullable();
            $table->text('repair_checklist')->nullable();
            $table->decimal('waste_percent', 10, 2)->nullable();
            $table->unsignedBigInteger('brand_id')->nullable();
            $table->decimal('ingredients_cost', 22, 4)->nullable();
            $table->integer('device_id')->nullable();
            $table->decimal('extra_cost', 22, 4)->nullable();
            $table->integer('created_by')->nullable();
            $table->string('production_cost_type')->nullable();
            $table->timestamps();
            $table->decimal('total_quantity', 22, 4)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('group_sub_taxes');
    }
};
