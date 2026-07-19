<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MachineController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\MaterialCategoryController;
use App\Http\Controllers\StockItemController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/katalog-produk', function () {
    return Inertia::render('Catalog');
})->name('catalog');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('products', ProductController::class);
        Route::resource('orders', OrderController::class)->only(['index', 'show', 'update']);
        Route::resource('portfolio', PortfolioController::class);
        Route::resource('machines', MachineController::class);
        Route::resource('testimonials', TestimonialController::class);
        Route::resource('material-categories', MaterialCategoryController::class);
        Route::resource('stock-items', StockItemController::class);
    });
});

require __DIR__.'/auth.php';
