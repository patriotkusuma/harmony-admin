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
        Schema::create('purchases', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('id_supplier');
            $table->foreignUuid('id_transaction');
            $table->date('purchase_date');
            $table->string('item_name');
            $table->int('quantity');
            $table->foreignUuid('id_unit');
            $table->double('total_amount', 15, 2)->default(0.00);
            $table->enum('type',['Operasional','Investasi','Persediaan','Lainnya'])->default('Lainnya');
            $table->text('description')->nullable();
            $table->string('proof_document')->nullable();
            $table->foreignUuid('id_outlet')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchases');
    }
};
