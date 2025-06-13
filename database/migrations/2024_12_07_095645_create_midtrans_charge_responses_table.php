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
        Schema::create('midtrans_charge_responses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('status_code');
            $table->string('status_message');
            $table->string('transaction_id');
            $table->string('order_id');
            $table->float('gross_amount');
            $table->string('currency');
            $table->enum('payment_type',['gopay','qris','airpay shopee']);
            $table->timestamp('transaction_time');
            $table->enum('transaction_status',['pending','capture','settlement','deny','cancel','expire','refund','partial_refund','authorize']);
            $table->enum('fraud_status',['accept','deny']);
            $table->text('actions');
            $table->timestamp('expiry_time')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('midtrans_charge_responses');
    }
};
