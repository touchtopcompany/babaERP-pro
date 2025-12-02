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
        Schema::create('business', function (Blueprint $table) {
            $table->id();
            $table->string('scheme_type')->nullable();
            $table->string('product_custom_field5', 191)->nullable();
            $table->string('name', 191)->nullable();
            $table->string('product_custom_field6', 191)->nullable();
            $table->integer('currency_id')->nullable();
            $table->string('number_type')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('business');
    }
};
