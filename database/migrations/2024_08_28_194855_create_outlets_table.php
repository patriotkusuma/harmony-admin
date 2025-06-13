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
        Schema::create('outlets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nama', 255);
            $table->string('nickname')->unique();
            $table->text('alamat');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->string('latitude')->default("0");
            $table->string('longitude')->default("0");
            $table->string("kode_qris");
            $table->string("foto_qris")->nullable();
            $table->string('telpon');
            $table->string('logo')->nullable();
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('outlets');
    }
};
