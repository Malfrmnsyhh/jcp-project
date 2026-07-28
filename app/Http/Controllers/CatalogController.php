<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(): Response
    {
        $products = Product::with([
            'category',
            'images' => fn ($query) => $query->orderBy('sort_order'),
        ])
            ->where('is_active', true)
            ->latest()
            ->get();

        return Inertia::render('Catalog', [
            'categories' => ProductCategory::all(),
            'products' => $products,
        ]);
    }

    public function show(Product $product): Response
    {
        $product->load([
            'category',
            'images' => fn ($query) => $query->orderBy('sort_order'),
        ]);

        return Inertia::render('Product/Show', [
            'product' => $product,
        ]);
    }
}
