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
        Schema::create('pjt_project_task_members', function (Blueprint $table) {
            $table->tinyInteger('show_time')->nullable();
            $table->id();
            $table->tinyInteger('show_brand')->nullable();
            $table->integer('project_task_id')->nullable();
            $table->tinyInteger('show_sku')->nullable();
            $table->tinyInteger('show_cat_code')->nullable();
            $table->foreignId('business_id')->nullable()->constrained('business')->nullOnDelete();
            $table->string('name', 191)->nullable();
            $table->string('status', 191)->nullable();
            $table->double('amount', 5, 2)->nullable();
            $table->string('payment_status', 191)->nullable();
            $table->string('price_calculation_type')->nullable();
            $table->decimal('gross_total', 22, 4)->nullable();
            $table->integer('selling_price_group_id')->nullable();
            $table->integer('created_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pjt_project_task_members');
    }
};
