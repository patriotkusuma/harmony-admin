<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->uuid('uuid_customer')->nullable()->after('id');
            $table->double('outstanding_balance',15,2)->default(0.00);
            $table->string('no_wa')->nullable();
        });

        \App\Models\Customer::withoutEvents(function () {
            // Menggunakan chunk untuk menghemat memori jika ada banyak data
            \App\Models\Customer::whereNull('uuid_customer')->chunk(100, function ($records) {
                foreach ($records as $record) {
                    $record->uuid_customer = Str::uuid(); // Menghasilkan UUID baru
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
        Schema::table('customers', function (Blueprint $table) {
            $table->dropColumn('uuid_customer');
        });
    }
};
