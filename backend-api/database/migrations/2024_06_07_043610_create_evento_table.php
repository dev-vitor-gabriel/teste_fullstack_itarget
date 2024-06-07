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
        Schema::create('tb_evento', function (Blueprint $table) {
            $table->id('id_evento_tbe');
            $table->string('nome_evento_tbe');
            $table->date('dta_inicio_evento_tbe');
            $table->date('dta_fim_evento_tbe');
            $table->boolean('status_evento_tbe')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_evento');
    }
};
