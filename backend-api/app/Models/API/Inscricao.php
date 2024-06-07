<?php

namespace App\Models\API;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscricao extends Model
{
    use HasFactory;

    protected $table = "tb_inscricao";

    protected $fillable = [
        'id_evento_tbi',
        'nome_inscricao_tbi',
        'cpf_inscricao_tbi',
        'email_inscricao_tbi',
        'is_ativo_tbi'
    ];
}
