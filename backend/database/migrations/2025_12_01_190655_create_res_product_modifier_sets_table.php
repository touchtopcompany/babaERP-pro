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
        Schema::create('res_product_modifier_sets', function (Blueprint $table) {
            $table->string('status', 191)->nullable();
            $table->text('sms_body')->nullable();
            $table->timestamps();
            $table->integer('res_table_id')->nullable();
            $table->integer('for_curr')->nullable();
            $table->text('email_body')->nullable();
            $table->integer('account_id')->nullable();
            $table->integer('res_waiter_id')->nullable();
            $table->string('template_for', 191)->nullable();
            $table->string('guard_name')->nullable();
            $table->string('payment_ref_no', 191)->nullable();
            $table->foreignId('business_id')->nullable()->constrained('business')->nullOnDelete();
            $table->string('name', 191)->nullable();
            $table->string('document', 191)->nullable();
            $table->unsignedBigInteger('transaction_id')->nullable();
            $table->id();
            $table->string('note', 191)->nullable();
            $table->string('transaction_type', 191)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('res_product_modifier_sets');
    }
};
