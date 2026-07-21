<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MachineController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\MaterialCategoryController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\StockItemController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProductCategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Models\PortfolioItem;
use App\Models\Testimonial;
use App\Models\Machine;

Route::get('/', function () {
    $portfolios = PortfolioItem::orderBy('created_at', 'desc')->take(6)->get();
    $testimonials = Testimonial::where('is_published', true)
        ->orderBy('created_at', 'desc')
        ->take(6)
        ->get()
        ->map(function ($testimonial) {
            return [
                'customer_name' => $testimonial->customer_name,
                'customer_role' => $testimonial->customer_role,
                'content' => $testimonial->content,
                'product_image' => $testimonial->product_image,
            ];
        });

    $machines = \App\Models\Machine::where('is_active', true)
        ->orderBy('created_at', 'desc')
        ->get();

    $materials = \App\Models\Material::with([
            'category', 
            'thicknesses' => function($q) { $q->orderBy('sort_order'); }, 
            'finishes'
        ])
        ->get()
        ->map(function ($m) {
            return [
                'id' => $m->id,
                'category' => $m->category ? $m->category->name : 'Lainnya',
                'name' => $m->name,
                'short_description' => \Illuminate\Support\Str::limit($m->description, 60),
                'description' => $m->description,
                'thickness_options' => $m->thicknesses->pluck('label')->toArray(),
                'finishes' => $m->finishes->map(function ($f) {
                    return [
                        'name' => $f->name,
                        'swatch' => $f->swatch_hex ?? '#cccccc'
                    ];
                })->toArray()
            ];
        });

    return Inertia::render('Home', [
        'portfolios' => $portfolios,
        'testimonials' => $testimonials,
        'machines' => $machines,
        'materials' => $materials,
    ]);
});

Route::get('/katalog-produk', function () {
    $categories = \App\Models\ProductCategory::all();
    $products = \App\Models\Product::with(['category', 'images' => function($q) { $q->orderBy('sort_order'); }])
        ->where('is_active', true)
        ->orderBy('created_at', 'desc')
        ->get();

    return Inertia::render('Catalog', [
        'categories' => $categories,
        'products' => $products
    ]);
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
