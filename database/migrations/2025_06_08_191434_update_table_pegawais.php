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
        Schema::table('pegawais', function (Blueprint $table) {
            $table->uuid('uuid_pegawais')->unique()->nullable()->after('id');
            $table->string('no_wa')->nullable();
        });

        \App\Models\Pegawai::withoutEvents(function(){
            \App\Models\Pegawai::whereNull('uuid')->chuck(100, function($pegawai){
                foreach($pegawai as $pgw){
                    $pgw->uuid = \Illuminate\Support\Str::uuid();
                    $pgw->save();
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
