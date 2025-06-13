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
        Schema::create('midtrans_notifications', function (Blueprint $table) {
            $table->uuid('id');
            $table->string('transaction_type')->nullable();
            $table->timestamp('transaction_time');
            $table->enum('transaction_status',['settlement','capture','pending','deny','cancel','expired','failure','refund','partial_refund','authorize']);
            $table->uuid('transaction_id');
            $table->string('status_message');
            $table->string('status_code');
            $table->string('signature_key');
            $table->timestamp('settlement_time')->nullable();
            $table->enum('payment_type',['qris', 'gopay', 'airpay shopee']);
            $table->string('order_id');
            $table->string('merchant_id');
            $table->string('issuer')->nullable();
            $table->float('gross_amount')->default(0);
            $table->enum('fraud_status',['accept','deny']);
            $table->string('currency');
            $table->string('aqcuirer')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('midtrans_notifications');
    }
};
