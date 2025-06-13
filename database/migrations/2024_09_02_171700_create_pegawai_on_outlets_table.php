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
        Schema::create('pegawai_on_outlets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('id_pegawai');
            $table->foreignUuid('id_outlet')->nullable()->nullOnDelete();
            $table->foreignUuid('id_jabatan')->nullable()->nullOnDelete();
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pegawai_on_outlets');
    }
};
