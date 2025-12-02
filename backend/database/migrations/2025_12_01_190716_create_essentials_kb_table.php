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
        Schema::create('essentials_kb', function (Blueprint $table) {
            $table->timestamps();
            $table->id();
            $table->integer('stop_selling_before')->nullable();
            $table->foreignId('business_id')->nullable()->constrained('business')->nullOnDelete();
            $table->tinyInteger('enable_tooltip')->nullable();
            $table->string('name', 191)->nullable();
            $table->tinyInteger('purchase_in_diff_currency')->nullable();
            $table->string('campaign_type')->nullable();
            $table->integer('purchase_currency_id')->nullable();
            $table->string('subject', 191)->nullable();
            $table->decimal('p_exchange_rate', 20, 3)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('essentials_kb');
    }
};
