<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\API\Inscricao;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http; // Adicionar esta linha

class InscricaoController extends Controller
{
    public function create(Request $request) {
        $request->validate([
            'id_evento_tbi' => 'required|int',
            'nome_inscricao_tbi' => 'required|string|max:255',
            'cpf_inscricao_tbi' => 'required|string|max:14',
            'email_inscricao_tbi' => 'required|string|max:255'
        ]);

        // Busca os eventos da API externa
        $response = Http::get('https://demo.ws.itarget.com.br/event.php');
        if ($response->failed()) {
            return response()->json(['message' => 'Erro ao buscar eventos da API'], 500);
        }

        $events = $response->json()['data'];
        $eventoAtual = collect($events)->firstWhere('id', $request->id_evento_tbi);

        if (!$eventoAtual) {
            return response()->json(['message' => 'Evento não encontrado'], 404);
        }

        // Busca todas as inscrições existentes para o mesmo CPF
        $inscricoesExistentes = Inscricao::where('cpf_inscricao_tbi', $request->cpf_inscricao_tbi)->get();

        // Verifica se há um conflito de datas
        foreach ($inscricoesExistentes as $inscricao) {
            $eventoInscrito = collect($events)->firstWhere('id', $inscricao->id_evento_tbi);
            if ($eventoInscrito) {
                $eventoAtualInicio = strtotime($eventoAtual['start_date']);
                $eventoAtualFim = strtotime($eventoAtual['end_date']);
                $eventoInscritoInicio = strtotime($eventoInscrito['start_date']);
                $eventoInscritoFim = strtotime($eventoInscrito['end_date']);

                if (($eventoAtualInicio <= $eventoInscritoFim) && ($eventoAtualFim >= $eventoInscritoInicio)) {
                    return response()->json(['message' => 'Você já está inscrito em outro evento no mesmo período.'], 400);
                }
            }
        }

        // Se não houver conflito, cria a inscrição
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
