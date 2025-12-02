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
        Schema::create('transactions', function (Blueprint $table) {
            $table->timestamps();
            $table->integer('payment_for')->nullable();
            $table->string('pay_method', 191)->nullable();
            $table->unsignedBigInteger('location_id')->nullable();
            $table->tinyInteger('paid_through_link')->nullable();
            $table->id();
            $table->bigInteger('model_id')->nullable();
            $table->foreignId('business_id')->nullable()->constrained('business')->nullOnDelete();
            $table->integer('created_by')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
