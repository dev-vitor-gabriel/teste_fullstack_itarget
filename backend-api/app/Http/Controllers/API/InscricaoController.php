<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\API\Inscricao;
use Illuminate\Http\Request;

class InscricaoController extends Controller
{
    public function create(Request $request) {

        $request->validate([
            'id_evento_tbi' =>  'required|int',
            'nome_inscricao_tbi' => 'required|string|max:255',
            'cpf_inscricao_tbi' => 'required|string|max:14',
            'email_inscricao_tbi' => 'required|string|max:255'
        ]);
        $inscricao = Inscricao::create([
            'id_evento_tbi' => $request->id_evento_tbi,
            'nome_inscricao_tbi' => $request->nome_inscricao_tbi,
            'cpf_inscricao_tbi' => $request->cpf_inscricao_tbi,
            'email_inscricao_tbi' => $request->email_inscricao_tbi,
            'is_ativo_tbi' => 1,
        ]);

        return response()->json($inscricao,201);
    }
}
