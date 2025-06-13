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
        Schema::create('vouchers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            // $table->foreignId('id_customer')->constrained('customers','id','customer_key')->onUpdate('casecade')->onDelete('casecade');
            $table->string('nama');
            $table->string('kode_voucher');
            $table->enum('jenis', ['nominal','persen','cashback','gift'])->default('nominal');
            $table->float('nilai')->default(0);
            $table->integer('kuota')->default(0);
            $table->dateTime('start_time')->nullable();
            $table->enum('status',['active', 'inactive'])->default('inactive');
            $table->dateTime('end_time')->nullable();
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
