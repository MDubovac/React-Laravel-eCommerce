<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\CartController;

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

/* Public routes */
// Categories
Route::get('/all_categories', [FrontendController::class, 'getAllCategories']);
Route::get('/all_products/{slug}', [FrontendController::class, 'getProductsByCategorySlug']);
Route::get('/view-product/{category_slug}/{product_slug}', [FrontendController::class, 'getProductBySlug']);

// Cart
Route::post('/add-to-cart', [CartController::class, 'addToCart']);
Route::get('/view-cart', [CartController::class, 'viewCart']);
Route::put('/cart-update-quantity/{cart_id}/{scope}', [CartController::class, 'updateQuantity']);
Route::delete('/delete-cart-item/{cart_id}', [CartController::class, 'deleteCartItem']);

// Regiser & Login
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
    Route::delete('/delete_product/{id}', [ProductController::class, 'delete']);

});

Route::get('/greeting', function () {
    return 'Hello World';
});
