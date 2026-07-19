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

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function() {
    // 1. Katalog Produk
    Route::resource('products', ProductController::class);
    Route::resource('product-categories', ProductCategoryController::class);

    // 2. Katalog Bahan
    Route::resource('materials', MaterialController::class);
    Route::resource('material-categories', MaterialCategoryController::class);

    // 3. Konten Website
    Route::resource('portfolio', PortfolioController::class);
    Route::resource('machines', MachineController::class);
    Route::resource('testimonials', TestimonialController::class);

    // 4. Operasional (Stok)
    Route::resource('stocks', StockItemController::class);

    // 5. Penjualan (Order)
    Route::get('orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('orders/{order}', [OrderController::class, 'show'])->name('orders.show');
    Route::post('orders/{order}/confirm', [OrderController::class, 'confirm'])->name('orders.confirm');
    Route::patch('orders/{order}/status', [OrderController::class, 'status'])->name('orders.status');
});

require __DIR__.'/auth.php';
