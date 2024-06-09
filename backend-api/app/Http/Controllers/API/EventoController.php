<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\API\Evento;


class EventoController extends Controller
{
    public function get(Int $id_evento = null) {
        if($id_evento){
            $data = Evento::getById(($id_evento));
            return $data;
        }
        $data = Evento::getAll();
        return $data;
    }
}
