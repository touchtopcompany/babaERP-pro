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
        Schema::create('business_locations', function (Blueprint $table) {
            $table->string('name', 191)->nullable();
            $table->tinyInteger('show_client_id')->nullable();
            $table->id();
            $table->text('description')->nullable();
            $table->string('client_id_label', 191)->nullable();
            $table->integer('created_by')->nullable();
            $table->string('client_tax_label', 191)->nullable();
            $table->softDeletes();
            $table->string('date_label', 191)->nullable();
            $table->timestamps();
            $table->string('date_time_format', 191)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('business_locations');
    }
};
