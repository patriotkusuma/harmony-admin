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
        Schema::create('transactions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('id_transaction_type');
            $table->dateTime('transaction_date');
            $table->foreignUuid('id_account');
            $table->foreignUuid('related_entity_id')->nullable()->comment('ID pelanggan, pegawai, atau vendor terkait (FK ke tabel UUID lain)');
            $table->string('related_entity_type')->nullable()->comment('Nama tabel terkait (Customers, Pegawais, Suppliers, Pesanans, Payroll, Purchases, Assets)');
            $table->text('description')->nullable();
            $table->double('amount', 15,2)->default(0.00);
            $table->enum('debit_credit_indicator', ['D','C'])->default('D')->comment('D for Debit, C for Credit');
            $table->double('balance_after_transaction', 15, 2)->default(0.00)->comment('Saldo akun yang terpengaruh setelah transaksi ini');
            $table->string('proof_document')->nullable()->comment('path atau nama file untuk bukti pendukung');
            $table->foreignUuid('id_outlet')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
