<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/product', [ProductController::class, 'show'])->name('product.show');
Route::get('/product/pdf', [ProductController::class, 'downloadPdf'])->name('product.pdf');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
