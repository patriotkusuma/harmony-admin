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
        Schema::create('equity_sources', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->double('initial_investment', 15, 2)->default(0.00);
            $table->double('current_capital', 15, 2)->default(0.00);
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equity_sources');
    }
};
