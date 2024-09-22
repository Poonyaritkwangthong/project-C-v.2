<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\BrandAPIController;
use App\Http\Controllers\CarAPIController;
use App\Http\Controllers\EngineAPIController;
use App\Http\Controllers\API\CarController;
use App\Http\Controllers\API\BrandController;
use App\Http\Controllers\API\EngineController;
use App\Http\Controllers\API\LikeCarController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::resource('/cars',CarController::class);

Route::resource('/brands',BrandController::class);

Route::resource('/engines',EngineController::class);

Route::resource('/likes',LikeCarController::class);

Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
Route::get('/user',[AuthController::class,'user']);
Route::post('/logout',[AuthController::class,'logout']);
});
