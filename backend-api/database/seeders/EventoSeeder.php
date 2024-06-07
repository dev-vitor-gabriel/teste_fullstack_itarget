<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class EventoSeeder extends Seeder
{
    public function run()
    {
        $url = 'https://demo.ws.itarget.com.br/event.php'; // URL que contém o JSON
        $response = Http::withoutVerifying()->get($url);

        if ($response->ok()) {
            $eventos = $response->json()['data'];

            foreach ($eventos as $evento) {
                DB::table('tb_evento')->insert([
                    'nome_evento_tbe' => $evento['name'],
                    'dta_inicio_evento_tbe' => $evento['start_date'],
                    'dta_fim_evento_tbe' => $evento['end_date'],
                    'status_evento_tbe' => $evento['status'] ? 1 : 0,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            $this->command->info('Eventos inseridos com sucesso!');
        } else {
            $this->command->error('Erro ao obter os eventos da URL.');
        }
    }
    public function down()
    {
        DB::table('tb_evento')->truncate();
    }
}
