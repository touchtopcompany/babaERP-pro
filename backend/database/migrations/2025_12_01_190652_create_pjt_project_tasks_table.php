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
        Schema::create('pjt_project_tasks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('location_id')->nullable();
            $table->date('allocated_upto')->nullable();
            $table->timestamps();
            $table->integer('secondary_unit_id')->nullable();
            $table->string('source', 191)->nullable();
            $table->integer('parent_id')->nullable();
            $table->integer('unit_id')->nullable();
            $table->string('ref_no', 191)->nullable();
            $table->string('short_code', 191)->nullable();
            $table->string('price_type', 191)->nullable();
            $table->string('type')->nullable();
            $table->text('sub_unit_ids')->nullable();
            $table->string('transaction_type')->nullable();
            $table->decimal('purchase_price_inc_tax', 22, 4)->nullable();
            $table->foreignId('business_id')->nullable()->constrained('business')->nullOnDelete();
            $table->string('invoice_no', 191)->nullable();
            $table->integer('asset_id')->nullable();
            $table->decimal('sell_price_inc_tax', 22, 4)->nullable();
            $table->string('name', 191)->nullable();
            $table->integer('customer_group_id')->nullable();
            $table->tinyInteger('auto_send_wa_notif')->nullable();
            $table->integer('price_group_id')->nullable();
            $table->unsignedBigInteger('contact_id')->nullable();
            $table->tinyInteger('auto_send_sms')->nullable();
            $table->integer('variation_id')->nullable();
            $table->string('adjustment_type')->nullable();
            $table->tinyInteger('auto_send')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pjt_project_tasks');
    }
};
