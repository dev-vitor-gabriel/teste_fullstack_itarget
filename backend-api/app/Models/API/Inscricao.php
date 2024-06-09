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

    public static function getAll()
    {
        $data = Inscricao::select(['*'])->where('is_ativo_tbi', 1)->orderBy('id_inscricao_tbi', 'desc')->get();
        dd($data);
        return response()->json($data);
    }

    public static function getById(Int $id = null) {
        if($id) {
            $data = Inscricao::select(['*'])->where('id_inscricao_tbi', $id)->where('is_ativo_tbi', 1)->orderBy('id_inscricao_tbi', 'desc')->get();
        }else{
            $data = Inscricao::select(['*'])->where('is_ativo_tbi', 1)->orderBy('id_inscricao_tbi', 'desc')->get();
        }
        return response()->json($data);
    }

    public static function searchByName($nome)
    {
        return self::where('nome_inscricao_tbi', 'LIKE', "%{$nome}%")->get();
    }
}
