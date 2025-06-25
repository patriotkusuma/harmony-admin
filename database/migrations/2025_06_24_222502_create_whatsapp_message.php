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
        Schema::create('whatsapp_messages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('message_id');
            $table->string('sender_no');
            $table->string('receiver_no');
            $table->boolean('from_customer')->default(true);
            $table->boolean('is_group')->default(false);
            $table->enum('message_type', ['text', 'image', 'audio', 'video', 'document', 'location', 'contact', 'other'])->default('text');
            $table->text('message_content')->nullable();
            $table->text('media_url')->nullable();
            $table->dateTime('timestamp')->useCurrent();
            $table->enum('status', ['sent', 'received', 'read', 'failed'])->default('received');
            $table->uuid('uuid_customer')->nullable();
            $table->uuid('id_outlet')->nullable();
            $table->foreign('id_outlet')->references('id')->on('outlets')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('whatsapp_message');
    }
};
