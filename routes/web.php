<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');
Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');
Route::get('/blog', function () {
    return Inertia::render('blog');
})->name('blog');

Route::resource('/users', UserController::class)->only(['index', 'edit', 'create', 'show', 'destroy', 'update', 'store']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
