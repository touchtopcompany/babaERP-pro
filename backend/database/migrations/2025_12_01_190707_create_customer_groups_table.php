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
        Schema::create('customer_groups', function (Blueprint $table) {
            $table->text('landmark')->nullable();
            $table->string('city', 191)->nullable();
            $table->integer('notify_before')->nullable();
            $table->unsignedBigInteger('location_id')->nullable();
            $table->string('paid_label', 191)->nullable();
            $table->string('name', 191)->nullable();
            $table->id();
            $table->text('address_line_1')->nullable();
            $table->foreignId('business_id')->nullable()->constrained('business')->nullOnDelete();
            $table->string('total_due_label', 191)->nullable();
            $table->text('notify_via')->nullable();
            $table->string('round_off_label', 191)->nullable();
            $table->string('color', 191)->nullable();
            $table->string('country', 191)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_groups');
    }
};
