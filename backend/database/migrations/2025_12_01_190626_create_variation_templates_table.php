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
        Schema::create('variation_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name', 191)->nullable();
            $table->text('meta_description')->nullable();
            $table->string('sub_heading_line1', 191)->nullable();
            $table->foreignId('business_id')->nullable()->constrained('business')->nullOnDelete();
            $table->string('tags', 191)->nullable();
            $table->string('sub_heading_line2', 191)->nullable();
            $table->integer('woocommerce_attr_id')->nullable();
            $table->string('feature_image')->nullable();
            $table->string('sub_heading_line3', 191)->nullable();
            $table->timestamps();
            $table->integer('priority')->nullable();
            $table->string('sub_heading_line4', 191)->nullable();
            $table->integer('created_by')->nullable();
            $table->string('sub_heading_line5', 191)->nullable();
            $table->tinyInteger('is_enabled')->nullable();
            $table->string('invoice_heading_not_paid')->nullable();
            $table->string('invoice_heading_paid', 191)->nullable();
            $table->string('tax_label', 191)->nullable();
            $table->integer('sort_order')->nullable();
            $table->string('prefix', 191)->nullable();
            $table->string('first_name', 191)->nullable();
            $table->unsignedBigInteger('contact_id')->nullable();
            $table->tinyInteger('is_completed_status')->nullable();
            $table->string('middle_name', 191)->nullable();
            $table->string('title', 191)->nullable();
            $table->text('sms_template')->nullable();
            $table->string('last_name', 191)->nullable();
            $table->string('status', 191)->nullable();
            $table->text('email_subject')->nullable();
            $table->string('email', 191)->nullable();
            $table->dateTime('start_datetime')->nullable();
            $table->text('email_body')->nullable();
            $table->dateTime('end_datetime')->nullable();
            $table->string('contact_status', 191)->nullable();
            $table->text('description')->nullable();
            $table->string('tax_number', 191)->nullable();
            $table->text('address_line_2')->nullable();
            $table->string('notify_type')->nullable();
            $table->string('zip_code', 191)->nullable();
            $table->date('dob')->nullable();
            $table->tinyInteger('is_recursive')->nullable();
            $table->string('mobile', 191)->nullable();
            $table->integer('recursion_days')->nullable();
            $table->string('landline', 191)->nullable();
            $table->text('followup_additional_info')->nullable();
            $table->string('alternate_number', 191)->nullable();
            $table->string('follow_up_by', 191)->nullable();
            $table->integer('pay_term_number')->nullable();
            $table->string('follow_up_by_value')->nullable();
            $table->string('pay_term_type')->nullable();
            $table->unsignedBigInteger('location_id')->nullable();
            $table->decimal('credit_limit', 22, 4)->nullable();
            $table->integer('converted_by')->nullable();
            $table->double('width', 22, 4)->nullable();
            $table->string('country', 100)->nullable();
            $table->dateTime('converted_on')->nullable();
            $table->double('height', 22, 4)->nullable();
            $table->string('state', 100)->nullable();
            $table->decimal('balance', 22, 4)->nullable();
            $table->double('paper_width', 22, 4)->nullable();
            $table->double('paper_height')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('variation_templates');
    }
};
