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
        Schema::create('cms_page_met', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('transaction_id')->nullable();
            $table->foreignId('business_id')->nullable()->constrained('business')->nullOnDelete();
            $table->string('product_custom_field8', 191)->nullable();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->string('tax_number_1', 100)->nullable();
            $table->unsignedBigInteger('contact_id')->nullable();
            $table->string('product_custom_field9', 191)->nullable();
            $table->integer('variation_id')->nullable();
            $table->string('tax_label_1', 10)->nullable();
            $table->text('subject')->nullable();
            $table->string('product_custom_field10', 191)->nullable();
            $table->string('tax_number_2', 100)->nullable();
            $table->longText('body')->nullable();
            $table->string('tax_label_2', 10)->nullable();
            $table->text('cc')->nullable();
            $table->string('code_label_1', 191)->nullable();
            $table->text('bcc')->nullable();
            $table->dateTime('start_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cms_page_met');
    }
};
