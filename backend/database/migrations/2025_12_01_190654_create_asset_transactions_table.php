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
        Schema::create('asset_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('sub_type', 20)->nullable();
            $table->tinyInteger('is_quotation')->nullable();
            $table->string('cc', 191)->nullable();
            $table->timestamps();
            $table->string('sub_status', 191)->nullable();
            $table->string('subject', 191)->nullable();
            $table->softDeletes();
            $table->string('res_order_status')->nullable();
            $table->string('platform')->nullable();
            $table->text('whatsapp_text')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_transactions');
    }
};
