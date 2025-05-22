<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TasksController;

Route::get('/', [TasksController::class, 'index']);
Route::post('/addTask', [TasksController::class, 'store']);
Route::put('/{task}/edit', [TasksController::class, 'update']);
Route::delete('/{task}/delete', [TasksController::class, 'destroy']);
Route::put('/{task}/toggle', [TasksController::class, 'toggle']);
