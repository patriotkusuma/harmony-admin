<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->uuid('uuid_customer')->unique()->after('id');
            $table->double('jumlah_cuci')->comment('total akumulasi pernah order berapa kali');
            $table->double('outstanding_balance',15,2)->default(0.00);
            $table->string('no_wa')->nullable();
            $table->index('uuid_customer');
        });

        $records = DB::table('customers')->get();

        foreach($records as $record){
            $newUUID = \Illuminate\Support\Str::uuid();

            $record->uuid = $newUUID;
            $record->save();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropColumn('uuid_customer');
        });
    }
};
