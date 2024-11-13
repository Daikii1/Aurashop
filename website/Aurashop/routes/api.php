<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;

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

// Routes without authentication
Route::get('/categories', [CategoryController::class, 'index']); // Get categories without auth
Route::get('/products', [ProductController::class, 'index']);    // Get products without auth
Route::post('/orders', [OrderController::class, 'store']);       // Create order without auth

// Routes that require authentication
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

    // Other protected routes
    Route::apiResource('products', ProductController::class)->except(['index']);
    Route::apiResource('categories', CategoryController::class)->except(['index']);
    Route::apiResource('orders', OrderController::class)->except(['store']);
});

// Authentication routes
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::get('/products/category/{categoryId}', [ProductController::class, 'getProductsByCategory']);
