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
        Schema::create('inventories', function (Blueprint $table) {
            $table->id();
            $table->integer('id_belanja')->nullable();
            $table->integer('id_satuan')->nullable();
            $table->string('nama');
            $table->date('tanggal_dibeli')->nullable();
            $table->date('tanggal_digunakan')->nullable();
            $table->date('tanggal_habis')->nullable();
            $table->float('qty')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventories');
    }
};
