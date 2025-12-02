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
        Schema::create('res_tables', function (Blueprint $table) {
            $table->string('total_label', 191)->nullable();
            $table->id();
            $table->string('supplier_business_name', 191)->nullable();
            $table->string('state', 191)->nullable();
            $table->string('discount_label', 191)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('res_tables');
    }
};
