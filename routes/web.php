<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MachineController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\MaterialCategoryController;
use App\Http\Controllers\StockItemController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('admin')->group(function () {
        Route::resource('products', ProductController);
        Route::resource('orders', OrderController)->only(['index', 'show', 'update']);
        Route::resource('portfolio', PortfolioController);
        Route::resource('testimonials', TestimonialController);
        Route::resource('material-categories', MaterialCategoryController);
        Route::resource('stock-items', StockItemController);
    });
});

require __DIR__.'/auth.php';
