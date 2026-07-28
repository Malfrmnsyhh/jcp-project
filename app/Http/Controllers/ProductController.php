<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['category', 'images'])->orderBy('created_at', 'desc')->paginate(10);
        return inertia('Admin/Products/Index', ['products' => $products]);
    }

    public function create()
    {
        return inertia('Admin/Products/Create', [
            'categories' => ProductCategory::orderBy('name')->get()
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();

        $data['slug'] = Str::slug($data['name']) . '-' . Str::random(4);
        $product = Product::create($data);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $file) {
                $path = $file->store('products', 'public');
                $product->images()->create([
                    'image_path' => '/storage/' . $path,
                    'sort_order' => $index
                ]);
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil ditambahkan.');
    }

    public function edit(Product $product)
    {
        return inertia('Admin/Products/Edit', [
            'product' => $product->load(['category', 'images']),
            'categories' => ProductCategory::orderBy('name')->get()
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update($request->validated());

        // Note: For a robust edit, we'd handle deleting old images if requested.
        // For now we just append new ones.
        if ($request->hasFile('images')) {
            $lastOrder = $product->images()->max('sort_order') ?? -1;
            foreach ($request->file('images') as $file) {
                $lastOrder++;
                $path = $file->store('products', 'public');
                $product->images()->create([
                    'image_path' => '/storage/' . $path,
                    'sort_order' => $lastOrder
                ]);
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(Product $product)
    {
        // Delete images from storage
        foreach($product->images as $image) {
            $path = str_replace('/storage/', '', $image->image_path);
            Storage::disk('public')->delete($path);
        }
        
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Product berhasil dihapus.');
    }
}
