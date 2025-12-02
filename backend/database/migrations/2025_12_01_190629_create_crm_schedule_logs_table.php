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
        Schema::create('crm_schedule_logs', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('schedule_id')->nullable();
            $table->string('log_type')->nullable();
            $table->dateTime('start_datetime')->nullable();
            $table->integer('sale_invoice_scheme_id')->nullable();
            $table->double('row_distance')->nullable();
            $table->integer('invoice_layout_id')->nullable();
            $table->double('col_distance', 22, 4)->nullable();
            $table->integer('sale_invoice_layout_id')->nullable();
            $table->integer('stickers_in_one_row')->nullable();
            $table->integer('selling_price_group_id')->nullable();
            $table->tinyInteger('is_default')->nullable();
            $table->tinyInteger('print_receipt_on_invoice')->nullable();
            $table->tinyInteger('is_continuous')->nullable();
            $table->string('receipt_printer_type')->nullable();
            $table->integer('stickers_in_one_sheet')->nullable();
            $table->integer('printer_id')->nullable();
            $table->foreignId('business_id')->nullable()->constrained('business')->nullOnDelete();
            $table->string('mobile', 191)->nullable();
            $table->timestamps();
            $table->text('featured_products')->nullable();
            $table->integer('created_by')->nullable();
            $table->integer('mfg_recipe_id')->nullable();
            $table->tinyInteger('is_active')->nullable();
            $table->string('name', 191)->nullable();
            $table->integer('variation_id')->nullable();
            $table->string('common_settings', 191)->nullable();
            $table->string('color', 191)->nullable();
            $table->integer('mfg_ingredient_group_id')->nullable();
            $table->text('default_payment_accounts')->nullable();
            $table->text('configuration')->nullable();
            $table->decimal('quantity', 22, 4)->nullable();
            $table->string('custom_field1', 191)->nullable();
            $table->decimal('waste_percent', 22, 4)->nullable();
            $table->string('custom_field2', 191)->nullable();
            $table->integer('sub_unit_id')->nullable();
            $table->string('custom_field3', 191)->nullable();
            $table->integer('sort_order')->nullable();
            $table->string('custom_field4', 191)->nullable();
            $table->text('accounting_default_map')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crm_schedule_logs');
    }
};
