<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('jenis_cucis', function (Blueprint $table) {
            $table->uuid('uuid_jenis_cuci')->unique()->nullable()->after('id');
        });

        \App\Models\JenisCuci::withoutEvents(function () {
            // Menggunakan chunk untuk menghemat memori jika ada banyak data
            \App\Models\JenisCuci::whereNull('uuid_jenis_cuci')->chunk(100, function ($records) {
                foreach ($records as $record) {
                    $record->uuid_jenis_cuci = Str::uuid(); // Menghasilkan UUID baru
                    $record->save(); // Menyimpan perubahan
                }
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jenis_cucis', function (Blueprint $table) {
            $table->dropColumn('uuid_jenis_cuci');
        });
    }
};
