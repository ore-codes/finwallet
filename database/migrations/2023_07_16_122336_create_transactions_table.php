<?php

use App\Enum\Transaction\Status;
use App\Enum\Transaction\Type;
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
        Schema::create('transactions', function (Blueprint $table) {
            $table->uuid()->primary();
            $table->foreignId('user_id')->references('id')->on('users');
            $table->enum('type', array_column(Type::cases(), 'value'));
            $table->string('counterparty_account');
            $table->string('counterparty_bank');
            $table->string('counterparty_name');
            $table->unsignedDouble('amount');
            $table->string('notes');
            $table->enum('status', array_column(Status::cases(), 'value'));
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
