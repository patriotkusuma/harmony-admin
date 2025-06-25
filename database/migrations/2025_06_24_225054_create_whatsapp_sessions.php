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
        Schema::create('whatsapp_sessions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('session_name');
            $table->string('client_id')->nullable();
            $table->string('no_wa')->nullable();
            $table->uuid('id_outlet')->nullable();
            $table->boolean('is_active')->default(true);
            $table->foreign('id_outlet')->references('id')->on('outlets')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('whatsapp_sessions');
    }
};
