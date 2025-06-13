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
        Schema::table('inventories', function (Blueprint $table) {
            $table->uuid('uuid')->after('id');
            $table->foreignUuid('id_unit');
            $table->double('initial_stock', 15,2)->default(0.00);
            $table->double('current_stock', 15, 2)->default(0.00);
            $table->date('purcashe_date');
            $table->date('expiry_date')->nullable();
            $table->date('last_used_date')->nullable();
            $table->double('cost_per_unit', 15, 2)->default(0.00)->comment('biaya per uni misal per kg. diupdate dengan metode FIFO/AVG');
            $table->text('description')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inventories', function (Blueprint $table) {
            //
        });
    }
};
