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
        Schema::create('categories', function (Blueprint $table) {
            $table->string('name', 191)->nullable();
            $table->string('user_type', 191)->nullable();
            $table->timestamps();
            $table->id();
            $table->foreignId('transaction_id')->nullable()->constrained()->nullOnDelete();
            $table->bigInteger('payroll_group_id')->nullable();
            $table->integer('created_by')->nullable();
            $table->double('left_margin', 22, 4)->nullable();
            $table->string('website', 191)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
