<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\API\Inscricao;
use Illuminate\Http\Request;

class InscricaoController extends Controller
{
    public function create(Request $request) {
        $request->validate([
            'id_evento_tbi' => 'required|int|exists:tb_evento,id_evento_tbe',
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

        return response()->json($inscricao, 201);
    }

    public function get($id_inscricao) {
        $inscricao = Inscricao::find($id_inscricao);

        if (!$inscricao) {
            return response()->json(['message' => 'Inscription not found'], 404);
        }

        return response()->json($inscricao);
    }

    public function getAll() {
        $inscricoes = Inscricao::all();
        return response()->json($inscricoes);
    }

    public function searchByName($nome) {
        $inscricoes = Inscricao::where('nome_inscricao_tbi', 'LIKE', "%{$nome}%")->get();

        if ($inscricoes->isEmpty()) {
            return response()->json(['message' => 'No inscriptions found'], 404);
        }

        return response()->json($inscricoes);
    }
}
