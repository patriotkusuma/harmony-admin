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
        Schema::table('assets', function (Blueprint $table) {
            if(Schema::hasColumn('assets', 'savage_value')){
                $table->renameColumn('savage_value', 'salvage_value');
            }
            $table->enum('status', ['Aktif', 'Dijual', 'Rusak', 'Dibuang'])->default('Aktif')->after('description');
            $table->date('last_depreciation_date')->nullable()->comment('Tanggal terakhir penyusutan dicatat')->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assets', function (Blueprint $table){
            $table->renameColumn('salvage_value', 'savage_value');
            $table->dropColumn('status');
            $table->dropColumn('last_depreciation_date');
        });
    }
};
