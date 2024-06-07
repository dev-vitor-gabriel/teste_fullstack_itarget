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
        Schema::create('tb_inscricao_evento', function (Blueprint $table) {
            $table->id('id_inscricao_evento_tie');
            $table->unsignedBigInteger('id_inscricao_tie');
            $table->unsignedBigInteger('id_evento_tie');
            $table->foreign('id_inscricao_tie')->references('id_inscricao_tbi')->on('tb_inscricao');
            $table->foreign('id_evento_tie')->references('id_evento_tbe')->on('tb_evento');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_inscricao_evento');
    }
};
