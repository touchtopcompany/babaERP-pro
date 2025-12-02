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
        Schema::create('crm_campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('on_product_expiry')->nullable();
            $table->text('email_body')->nullable();
            $table->text('sms_body')->nullable();
            $table->dateTime('sent_on')->nullable();
            $table->softDeletes();
            $table->text('contact_ids')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crm_campaigns');
    }
};
