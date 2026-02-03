<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\WorkerController;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function (){
    Route::post('/logout',[AuthController::class,'logout']);
    Route::get('/me',[AuthController::class,'me']);
    Route::apiResource('/worker',WorkerController::class);
    Route::get('/workers/options',[WorkerController::class,'options']);
});

Route::post('/signup',[AuthController::class,'signup']); 
Route::post('/login',[AuthController::class,'login']);
