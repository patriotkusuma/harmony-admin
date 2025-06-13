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
        Schema::create('belanja_kebutuhans', function (Blueprint $table) {
            $table->id();
            $table->integer('id_dana_keluar');
            $table->integer('sumber_dana_id')->nullable();
            $table->string('nama');
            $table->integer('qty');
            $table->enum('satuan', ['kilo', 'liter', 'satuan'])->default('satuan');
            $table->double('harga');
            $table->double('total_pembelian');
            $table->text('keterangan')->nullable();
            $table->date('tanggal_pembelian');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('belanja_kebutuhans');
    }
};
