<?php

use App\Http\Controllers\API\InscricaoController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CorsMiddleware; // Adicione esta linha

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware([CorsMiddleware::class])->group(function () {
    Route::controller(InscricaoController::class)->group(function () {
        Route::post('', 'create');
        Route::get('{id_inscricao}', 'get');
        Route::get('', 'getAll'); 
        Route::get('search/{nome}', 'searchByName'); // Nova rota para busca por nome
    });
});
