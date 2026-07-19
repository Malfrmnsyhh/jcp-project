<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->orderBy('created_at', 'desc')->paginate(10);
        return inertia('Admin/Products/Index',['products'=>$products] );
    }

    public function create()
    {
        return inertia('Admin/Products/Create');
    }

    public function store(StoreProductRequest $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'product_category_id' => 'required|exists:product_categories,id',
        ]);
        
        $data['slug'] = Str::slug($data['name']). '-'.Str::random(4);
        Product::create($data);
        return redirect()->route('admin.products.index')->with('success', 'Product berhasil ditambahkan.');
    }

    public function show(Product $product)
    {
        return inertia('Admin/Products/Show', ['product' => $product]);
    }

    public function edit(Product $product)
    {
        return inertia('Admin/Products/Edit', ['product' => $product->load('category')]);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'nullable|numeric',
            'description' => 'nullable|string',
            'product_category_id' => 'required|exists:product_categories,id',
        ]);

        $product->update($data);
        return redirect()->route('admin.products.index')->with('success', 'Product berhasil diperbarui.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Product berhasil dihapus.');
    }
}
