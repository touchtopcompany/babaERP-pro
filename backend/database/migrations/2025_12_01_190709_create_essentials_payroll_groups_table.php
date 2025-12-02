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
        Schema::create('essentials_payroll_groups', function (Blueprint $table) {
            $table->string('name', 191)->nullable();
            $table->tinyInteger('allow_notification')->nullable();
            $table->string('sub_total_label', 191)->nullable();
            $table->string('type', 191)->nullable();
            $table->integer('followup_category_id')->nullable();
            $table->timestamps();
            $table->string('quotation_heading', 191)->nullable();
            $table->id();
            $table->string('schedule_type')->nullable();
            $table->foreignId('business_id')->nullable()->constrained('business')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('essentials_payroll_groups');
    }
};
