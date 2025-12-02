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
        Schema::create('variation_location_deta', function (Blueprint $table) {
            $table->id();
            $table->text('additional_info')->nullable();
            $table->integer('created_by')->nullable();
            $table->timestamps();
            $table->string('security_pwd', 191)->nullable();
            $table->string('security_pattern')->nullable();
            $table->string('serial_no', 191)->nullable();
            $table->foreignId('business_id')->nullable()->constrained('business')->nullOnDelete();
            $table->integer('status_id')->nullable();
            $table->foreignId('location_id')->nullable()->constrained('business_locations')->nullOnDelete();
            $table->dateTime('delivery_date')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->text('product_configuration')->nullable();
            $table->string('status')->nullable();
            $table->text('defects')->nullable();
            $table->dateTime('closed_at')->nullable();
            $table->text('product_condition')->nullable();
            $table->decimal('closing_amount')->nullable();
            $table->integer('service_staff')->nullable();
            $table->integer('total_card_slips')->nullable();
            $table->text('comment_by_ss')->nullable();
            $table->integer('total_cheques')->nullable();
            $table->decimal('estimated_cost', 22, 4)->nullable();
            $table->text('denominations')->nullable();
            $table->text('closing_note')->nullable();
            $table->text('parts')->nullable();
            $table->string('custom_field_1', 191)->nullable();
            $table->foreignId('product_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name', 191)->nullable();
            $table->integer('product_variation_id')->nullable();
            $table->text('description')->nullable();
            $table->integer('variation_id')->nullable();
            $table->string('custom_field_3', 191)->nullable();
            $table->tinyInteger('use_for_repair')->nullable();
            $table->string('custom_field_4', 191)->nullable();
            $table->decimal('qty_available', 22, 4)->nullable();
            $table->softDeletes();
            $table->string('custom_field_5', 191)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('variation_location_deta');
    }
};
