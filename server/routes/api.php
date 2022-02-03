<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;

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

// Regular routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Logged in middleware routes
Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Admin middleware routes
Route::group(['middleware' => ['auth:sanctum', 'isApiAdmin']], function() {
    
    // Categories
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::get('/edit_category/{id}', [CategoryController::class, 'edit']);
    Route::put('/update_category/{id}', [CategoryController::class, 'update']);
    Route::delete('/delete_category/{id}', [CategoryController::class, 'delete']);

    // Products
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/products/{id}', [ProductController::class, 'getById']);
    Route::post('/update_product/{id}', [ProductController::class, 'update']);

});

Route::get('/greeting', function () {
    return 'Hello World';
});
