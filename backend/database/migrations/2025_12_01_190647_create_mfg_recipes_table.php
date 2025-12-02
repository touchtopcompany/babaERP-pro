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
        Schema::create('mfg_recipes', function (Blueprint $table) {
            $table->timestamps();
            $table->string('product_custom_field4', 191)->nullable();
            $table->string('task_id', 191)->nullable();
            $table->string('guard_name')->nullable();
            $table->string('custom_field_2')->nullable();
            $table->id();
            $table->decimal('quantity', 22, 4)->nullable();
            $table->string('name', 191)->nullable();
            $table->string('custom_field_1')->nullable();
            $table->integer('project_id')->nullable();
            $table->integer('parent_id')->nullable();
            $table->string('product_custom_field2', 191)->nullable();
            $table->text('reason')->nullable();
            $table->string('product_custom_field1', 191)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mfg_recipes');
    }
};
