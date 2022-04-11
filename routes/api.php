<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ScoreController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [RegisterController::class, 'create'])->name('api.register');

Route::get('/users/{username?}', [UserController::class, 'index'])->name('api.getUsers');

Route::post('/add-score', [ScoreController::class, 'addScore'])->name('api.addScore');

Route::get('/scores', [ScoreController::class, 'getScore'])->name('api.getScore');
