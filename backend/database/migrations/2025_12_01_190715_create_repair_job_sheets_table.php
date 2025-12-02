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
        Schema::create('repair_job_sheets', function (Blueprint $table) {
            $table->integer('total_digits')->nullable();
            $table->string('meta_key', 191)->nullable();
            $table->timestamps();
            $table->text('note')->nullable();
            $table->decimal('mfg_waste_percent', 22, 4)->nullable();
            $table->integer('invoice_count')->nullable();
            $table->bigInteger('cms_page_id')->nullable();
            $table->dateTime('end_datetime')->nullable();
            $table->integer('start_number')->nullable();
            $table->id();
            $table->decimal('unit_price', 22, 4)->nullable();
            $table->decimal('item_tax', 22, 4)->nullable();
            $table->double('default_profit_percent', 5, 2)->nullable();
            $table->string('line_discount_type')->nullable();
            $table->integer('tax_id')->nullable();
            $table->foreignId('business_id')->nullable()->constrained('business')->nullOnDelete();
            $table->decimal('line_discount_amount', 22, 4)->nullable();
            $table->integer('owner_id')->nullable();
            $table->integer('purchase_requisition_line_id')->nullable();
            $table->foreignId('location_id')->nullable()->constrained('business_locations')->nullOnDelete();
            $table->decimal('unit_price_inc_tax', 22, 4)->nullable();
            $table->string('time_zone', 191)->nullable();
            $table->integer('purchase_order_line_id')->nullable();
            $table->tinyInteger('fy_start_month')->nullable();
            $table->foreignId('contact_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name', 191)->nullable();
            $table->decimal('quantity_sold', 22, 4)->nullable();
            $table->string('accounting_method')->nullable();
            $table->string('job_sheet_no', 191)->nullable();
            $table->integer('waiter_id')->nullable();
            $table->decimal('quantity_adjusted', 22, 4)->nullable();
            $table->string('service_type')->nullable();
            $table->integer('table_id')->nullable();
            $table->string('code', 191)->nullable();
            $table->integer('discount_id')->nullable();
            $table->decimal('default_sales_discount', 5, 2)->nullable();
            $table->decimal('quantity_returned', 22, 4)->nullable();
            $table->text('pick_up_on_site_addr')->nullable();
            $table->integer('correspondent_id')->nullable();
            $table->integer('parent_id')->nullable();
            $table->integer('lot_no_line_id')->nullable();
            $table->string('sell_price_tax')->nullable();
            $table->decimal('po_quantity_purchased', 22, 4)->nullable();
            $table->softDeletes();
            $table->text('sell_line_note')->nullable();
            $table->string('logo', 191)->nullable();
            $table->unsignedBigInteger('brand_id')->nullable();
            $table->decimal('mfg_quantity_used', 22, 4)->nullable();
            $table->string('sku_prefix', 191)->nullable();
            $table->integer('device_id')->nullable();
            $table->integer('so_line_id')->nullable();
            $table->date('mfg_date')->nullable();
            $table->string('title', 191)->nullable();
            $table->integer('device_model_id')->nullable();
            $table->dateTime('booking_start')->nullable();
            $table->decimal('so_quantity_invoiced', 22, 4)->nullable();
            $table->tinyInteger('enable_product_expiry')->nullable();
            $table->date('exp_date')->nullable();
            $table->longText('content')->nullable();
            $table->text('checklist')->nullable();
            $table->dateTime('booking_end')->nullable();
            $table->integer('res_service_staff_id')->nullable();
            $table->string('expiry_type')->nullable();
            $table->string('lot_number', 191)->nullable();
            $table->string('status', 191)->nullable();
            $table->string('res_line_order_status', 191)->nullable();
            $table->integer('sub_unit_id')->nullable();
            $table->string('kb_type', 191)->nullable();
            $table->integer('woocommerce_line_items_id')->nullable();
            $table->integer('parent_sell_line_id')->nullable();
            $table->string('share_with')->nullable();
            $table->string('children_type', 191)->nullable();
            $table->bigInteger('created_by')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repair_job_sheets');
    }
};
