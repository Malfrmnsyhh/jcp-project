<?php

use App\Http\Controllers\CatalogController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MachineController;
use App\Http\Controllers\MaterialCategoryController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderPublicController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StockItemController;
use App\Http\Controllers\TestimonialController;
use Illuminate\Support\Facades\Route;

// public
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/katalog-produk', [CatalogController::class, 'index'])->name('catalog');
Route::get('/produk/{product}', [CatalogController::class, 'show'])->name('product.show');
Route::post('/order', [OrderPublicController::class, 'store'])->middleware('throttle:5,1');

// user terauth
Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// admin panel
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified', 'admin'])
    ->name('dashboard');

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // 1. Katalog Produk
    Route::resource('products', ProductController::class)->except(['show']);
    Route::resource('product-categories', ProductCategoryController::class)->except(['show']);

    // 2. Katalog Bahan
    Route::resource('materials', MaterialController::class)->except(['show']);
    Route::resource('material-categories', MaterialCategoryController::class)->except(['show']);

    // 3. Konten Website
    Route::resource('portfolio', PortfolioController::class)->except(['show']);
    Route::resource('machines', MachineController::class)->except(['show']);
    Route::resource('testimonials', TestimonialController::class)->except(['show']);

    // 4. Operasional (Stok)
    Route::resource('stocks', StockItemController::class)
        ->parameters(['stocks' => 'stockItem'])
        ->except(['show']);

    // 5. Penjualan (Order)
    Route::get('orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('orders/{order}', [OrderController::class, 'show'])->name('orders.show');
    Route::post('orders/{order}/confirm', [OrderController::class, 'confirm'])->name('orders.confirm');
    Route::patch('orders/{order}/status', [OrderController::class, 'status'])->name('orders.status');
    Route::delete('orders/{order}', [OrderController::class, 'destroy'])->name('orders.destroy');
});

require __DIR__.'/auth.php';
