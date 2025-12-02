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
        Schema::create('price_groups', function (Blueprint $table) {
            $table->id();
            $table->string('name', 191)->nullable();
            $table->text('description')->nullable();
            $table->foreignId('business_id')->nullable()->constrained('business')->nullOnDelete();
            $table->tinyInteger('is_active')->nullable();
            $table->softDeletes();
            $table->timestamps();
            $table->integer('created_by')->nullable();
            $table->string('booking_status')->nullable();
            $table->text('booking_note')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('price_groups');
    }
};
