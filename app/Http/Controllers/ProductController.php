<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->orderBy('created_at', 'desc')->paginate(10);
        return inertia('Admin/Products/Index', ['products' => $products]);
    }

    public function create()
    {
        return inertia('Admin/Products/Create', [
            'categories' => ProductCategory::orderBy('name')->get()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'product_category_id' => 'required|exists:product_categories,id',
            'stock_status' => 'required|in:tersedia,habis,pre_order',
            'is_active' => 'required|boolean',
        ]);
        
        $data['slug'] = Str::slug($data['name']) . '-' . Str::random(4);
        Product::create($data);

        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil ditambahkan.');
    }

    public function show(Product $product)
    {
        return inertia('Admin/Products/Show', ['product' => $product->load('category')]);
    }

    public function edit(Product $product)
    {
        return inertia('Admin/Products/Edit', [
            'product' => $product->load('category'),
            'categories' => ProductCategory::orderBy('name')->get()
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'product_category_id' => 'required|exists:product_categories,id',
            'stock_status' => 'required|in:tersedia,habis,pre_order',
            'is_active' => 'required|boolean',
        ]);

        $product->update($data);

        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Product berhasil dihapus.');
    }
}
