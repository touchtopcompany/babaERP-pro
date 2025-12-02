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
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title', 191)->nullable();
            $table->string('quotation_no_prefix', 191)->nullable();
            $table->string('decimal_separator', 10)->nullable();
            $table->string('layout', 191)->nullable();
            $table->string('invoice_no_prefix', 191)->nullable();
            $table->string('thousand_separator')->nullable();
            $table->string('type', 191)->nullable();
            $table->text('header_text')->nullable();
            $table->text('combo_variations')->nullable();
            $table->string('symbol', 25)->nullable();
            $table->string('ip_address', 191)->nullable();
            $table->softDeletes();
            $table->string('code', 25)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
