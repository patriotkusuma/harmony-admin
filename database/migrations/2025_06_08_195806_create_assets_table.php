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
        Schema::create('assets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('asset_name');
            $table->date('purchase_date');
            $table->double('purchase_price', 15, 2)->default(0.00);
            $table->string('depreciation_method')->nullable();
            $table->integer('usefull_live_years')->default(0);
            $table->double('savage_value', 15, 2)->default(0.00);
            $table->double('accumulated_depreciation', 15, 2)->default(0.00);
            $table->double('current_book_value', 15, 2)->default(0.00);
            $table->text('description')->nullable();
            $table->foreignUuid('id_outlet')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};
