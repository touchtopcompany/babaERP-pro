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
        Schema::create('mfg_recipe_ingredients', function (Blueprint $table) {
            $table->id();
            $table->text('description')->nullable();
            $table->integer('invoice_scheme_id')->nullable();
            $table->string('email', 191)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mfg_recipe_ingredients');
    }
};
