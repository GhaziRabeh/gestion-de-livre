<?php

use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\LogoutController;
use App\Http\Controllers\Api\RegisterController;
use Illuminate\Support\Facades\Route;

// Authentication
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/verify-email', [RegisterController::class, 'verifyEmail']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendOtp']);
Route::post('/reset-password', [ForgotPasswordController::class, 'resetPassword']);

// Public routes
Route::get('/books', [BookController::class, 'index']);
Route::get('/authors', [AuthorController::class, 'index']);

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {

    // Book details require login
    Route::get('/books/{book}', [BookController::class, 'show']);

    // Admin-only routes
    Route::middleware('is_admin')->group(function () {

        // Books CRUD
        Route::post('/books', [BookController::class, 'store']);
        Route::put('/books/{book}', [BookController::class, 'update']);
        Route::delete('/books/{book}', [BookController::class, 'destroy']);

        // Authors CRUD
        Route::get('/authors/{author}', [AuthorController::class, 'show']);
        Route::post('/authors', [AuthorController::class, 'store']);
        Route::put('/authors/{author}', [AuthorController::class, 'update']);
        Route::delete('/authors/{author}', [AuthorController::class, 'destroy']);
    });

    // Logout
    Route::post('/logout', [LogoutController::class, 'logout']);
});
