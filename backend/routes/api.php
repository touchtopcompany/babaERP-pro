<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    require __DIR__ . '/auth.php';

    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');

    // Dashboard routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/dashboard/metrics', [DashboardController::class, 'metrics']);
        Route::get('/dashboard/sales', [DashboardController::class, 'sales']);
    });
});
