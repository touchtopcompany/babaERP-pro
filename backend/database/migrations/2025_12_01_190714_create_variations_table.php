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
        Schema::create('variations', function (Blueprint $table) {
            $table->id();
            $table->integer('project_id')->nullable();
            $table->integer('project_task_id')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->dateTime('start_datetime')->nullable();
            $table->decimal('pp_without_discount', 22, 4)->nullable();
            $table->integer('mfg_ingredient_group_id')->nullable();
            $table->string('code_1', 191)->nullable();
            $table->integer('sent_by')->nullable();
            $table->decimal('discount_percent', 5, 2)->nullable();
            $table->decimal('quantity_returned', 20, 4)->nullable();
            $table->string('code_label_2', 191)->nullable();
            $table->timestamps();
            $table->decimal('purchase_price', 22, 4)->nullable();
            $table->decimal('unit_price_before_discount')->nullable();
            $table->string('code_2', 191)->nullable();
            $table->decimal('purchase_price_inc_tax', 22, 4)->nullable();
            $table->integer('default_sales_tax')->nullable();
            $table->tinyInteger('is_default')->nullable();
            $table->longText('meta_value')->nullable();
            $table->integer('created_by')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('variations');
    }
};
