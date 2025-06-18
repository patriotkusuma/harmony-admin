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
        Schema::create('service_revenue_accounts', function (Blueprint $table) {
            $table->uuid()->primary();
            $table->uuid('uuid_jenis_cuci');
            // $table->foreignId('id_jenis_cuci')->constrained('jenis_cucis')->onDelete('cascade');
            $table->uuid('id_revenue_account')->comment('FK ke account.id (hanya yang bertipe revenue)');
            $table->text('description')->nullable();
            $table->unique('uuid_jenis_cuci', 'unique_uuid_jenis_cuci_revenue_account');
            $table->foreign('id_revenue_account')->references('id')->on('accounts')->onDelete('cascade');
            $table->foreign('uuid_jenis_cuci')->references('uuid_jenis_cuci')->on('jenis_cucis')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_revenue_accounts');
    }
};
