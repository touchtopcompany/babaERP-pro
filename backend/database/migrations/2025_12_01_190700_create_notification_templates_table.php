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
        Schema::create('notification_templates', function (Blueprint $table) {
            $table->id();
            $table->integer('essentials_department_id')->nullable();
            $table->decimal('unit_price', 22, 4)->nullable();
            $table->string('bank_account_number', 191)->nullable();
            $table->integer('role_id')->nullable();
            $table->tinyInteger('allow_login')->nullable();
            $table->string('purchase_type', 191)->nullable();
            $table->string('cheque_number', 191)->nullable();
            $table->decimal('max_sales_discount_percent')->nullable();
            $table->date('purchase_date')->nullable();
            $table->string('card_security', 5)->nullable();
            $table->dateTime('paused_at')->nullable();
            $table->unsignedBigInteger('location_id')->nullable();
            $table->string('card_year', 191)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notification_templates');
    }
};
