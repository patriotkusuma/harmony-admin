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
        Schema::create('dana_keluars', function (Blueprint $table) {
            $table->id();
            $table->integer('sumber_dana_id')->nullable();
            $table->string('keperluan');
            $table->double('jumlah_keluar');
            $table->string('bukti_keluar')->nullable();
            $table->text('keterangan')->nullable();
            $table->date('tanggal_keluar');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dana_keluars');
    }
};
