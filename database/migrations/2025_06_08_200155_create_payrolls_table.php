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
        Schema::create('payrolls', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('id_pegawai');
            $table->foreignUuid('id_transaction');
            $table->date('payroll_date');
            $table->double('base_salary', 15, 2)->default(0.00);
            $table->double('allowances', 15, 2)->default(0.00);
            $table->double('deductions', 15, 2)->default(0.00);
            $table->double('net_salary', 15, 2)->default(0.00);
            $table->enum('payment_status', ['paid', 'pending'])->default('pending');
            $table->text('descrition')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payrolls');
    }
};
