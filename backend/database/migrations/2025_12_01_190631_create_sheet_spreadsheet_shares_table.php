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
        Schema::create('sheet_spreadsheet_shares', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('sheet_spreadsheet_id')->nullable();
            $table->string('shared_with', 191)->nullable();
            $table->integer('shared_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sheet_spreadsheet_shares');
    }
};
