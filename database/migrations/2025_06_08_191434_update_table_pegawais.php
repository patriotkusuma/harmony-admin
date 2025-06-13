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
        Schema::table('pegawais', function (Blueprint $table) {
            $table->uuid('uuid_pegawai')->unique()->nullable()->after('id');
            $table->string('no_wa')->nullable();
        });

        \App\Models\Pegawai::withoutEvents(function () {
            // Menggunakan chunk untuk menghemat memori jika ada banyak data
            \App\Models\Pegawai::whereNull('uuid_pegawai')->chunk(100, function ($records) {
                foreach ($records as $record) {
                    $record->uuid_pegawai = Str::uuid(); // Menghasilkan UUID baru
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
        Schema::table('pegawais', function (Blueprint $table) {
            $table->dropColumn('uuid');
        });
    }
};
