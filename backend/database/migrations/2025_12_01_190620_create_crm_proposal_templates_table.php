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
        Schema::create('crm_proposal_templates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->nullable()->constrained('business')->nullOnDelete();
            $table->string('name', 191)->nullable();
            $table->unsignedBigInteger('transaction_id')->nullable();
            $table->integer('project_task_id')->nullable();
            $table->integer('package_id')->nullable();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->string('task', 191)->nullable();
            $table->text('comment')->nullable();
            $table->date('start_date')->nullable();
            $table->string('sub_sku', 191)->nullable();
            $table->text('description')->nullable();
            $table->integer('commented_by')->nullable();
            $table->string('connection_type')->nullable();
            $table->date('trial_end_date')->nullable();
            $table->integer('product_variation_id')->nullable();
            $table->decimal('rate', 22, 4)->nullable();
            $table->timestamps();
            $table->string('capability_profile')->nullable();
            $table->date('end_date')->nullable();
            $table->integer('woocommerce_variation_id')->nullable();
            $table->integer('tax_rate_id')->nullable();
            $table->string('char_per_line')->nullable();
            $table->decimal('package_price', 22, 4)->nullable();
            $table->integer('variation_value_id')->nullable();
            $table->decimal('quantity', 22, 4)->nullable();
            $table->longText('package_details')->nullable();
            $table->decimal('default_purchase_price')->nullable();
            $table->decimal('total', 22, 4)->nullable();
            $table->string('port', 191)->nullable();
            $table->integer('created_id')->nullable();
            $table->decimal('dpp_inc_tax', 22, 4)->nullable();
            $table->string('path', 191)->nullable();
            $table->string('paid_via', 191)->nullable();
            $table->decimal('profit_percent', 22, 4)->nullable();
            $table->integer('created_by')->nullable();
            $table->string('payment_transaction_id')->nullable();
            $table->decimal('default_sell_price', 22, 4)->nullable();
            $table->string('status')->nullable();
            $table->decimal('sell_price_inc_tax', 22, 4)->nullable();
            $table->softDeletes();
            $table->string('country', 100)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crm_proposal_templates');
    }
};
