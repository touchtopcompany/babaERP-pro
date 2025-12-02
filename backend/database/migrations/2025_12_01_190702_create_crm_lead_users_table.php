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
        Schema::create('crm_lead_users', function (Blueprint $table) {
            $table->foreignId('business_id')->nullable()->constrained('business')->nullOnDelete();
            $table->timestamps();
            $table->string('last_name', 191)->nullable();
            $table->id();
            $table->string('name', 191)->nullable();
            $table->string('first_name', 191)->nullable();
            $table->integer('variation_template_id')->nullable();
            $table->char('surname', 10)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crm_lead_users');
    }
};
