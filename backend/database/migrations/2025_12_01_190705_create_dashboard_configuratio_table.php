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
        Schema::create('dashboard_configuratio', function (Blueprint $table) {
            $table->string('subject', 191)->nullable();
            $table->double('top_margin', 22, 4)->nullable();
            $table->string('alternate_number', 191)->nullable();
            $table->id();
            $table->dateTime('end_datetime')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dashboard_configuratio');
    }
};
