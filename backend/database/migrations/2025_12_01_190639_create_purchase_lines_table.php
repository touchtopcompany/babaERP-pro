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
        Schema::create('purchase_lines', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->tinyInteger('is_default')->nullable();
            $table->dateTime('due_date')->nullable();
            $table->tinyInteger('is_service_staff')->nullable();
            $table->string('priority')->nullable();
            $table->text('description')->nullable();
            $table->integer('created_by')->nullable();
            $table->string('status')->nullable();
            $table->string('custom_field_4')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_lines');
    }
};
