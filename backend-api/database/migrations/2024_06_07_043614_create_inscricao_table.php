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
        Schema::create('tb_inscricao', function (Blueprint $table) {
            $table->id('id_inscricao_tbi');
            $table->integer('id_evento_tbi');
            $table->string('nome_inscricao_tbi');
            $table->string('cpf_inscricao_tbi');
            $table->string('email_inscricao_tbi');
            $table->boolean('is_ativo_tbi')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_inscricao');
    }
};
