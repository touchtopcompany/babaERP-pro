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
        Schema::create('pjt_projects', function (Blueprint $table) {
            $table->id();
            $table->string('name', 191)->nullable();
            $table->foreignId('business_id')->nullable()->constrained('business')->nullOnDelete();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->tinyInteger('is_dummy')->nullable();
            $table->unsignedBigInteger('contact_id')->nullable();
            $table->timestamps();
            $table->string('status')->nullable();
            $table->decimal('essentials_salary', 22, 4)->nullable();
            $table->string('essentials_pay_period', 191)->nullable();
            $table->string('actual_name', 191)->nullable();
            $table->string('essentials_pay_cycle', 191)->nullable();
            $table->string('short_name', 191)->nullable();
            $table->tinyInteger('allow_decimal')->nullable();
            $table->integer('crm_contact_id')->nullable();
            $table->integer('base_unit_id')->nullable();
            $table->tinyInteger('is_cmmsn_agnt')->nullable();
            $table->decimal('base_unit_multiplier', 20, 4)->nullable();
            $table->decimal('cmmsn_percent', 4, 2)->nullable();
            $table->string('gateway', 191)->nullable();
            $table->integer('created_by')->nullable();
            $table->tinyInteger('selected_contacts')->nullable();
            $table->tinyInteger('is_advance')->nullable();
            $table->softDeletes();
            $table->date('dob')->nullable();
            $table->string('gender', 191)->nullable();
            $table->string('marital_status')->nullable();
            $table->tinyInteger('is_allocatable')->nullable();
            $table->text('description')->nullable();
            $table->integer('cash_register_id')->nullable();
            $table->decimal('amount', 22, 4)->nullable();
            $table->integer('modifier_set_id')->nullable();
            $table->string('type', 191)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pjt_projects');
    }
};
