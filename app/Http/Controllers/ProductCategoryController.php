<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductCategoryController extends Controller
{
    public function index()
    {
        $categories = ProductCategory::orderBy('created_at', 'desc')->paginate(10);
        return inertia('Admin/ProductCategories/Index', [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return inertia('Admin/ProductCategories/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:product_categories,name',
        ]);

        $data['slug'] = Str::slug($data['name']);

        ProductCategory::create($data);

        return redirect()->route('admin.product-categories.index')->with('success', 'Kategori produk berhasil ditambahkan.');
    }

    public function show(string $id)
    {
        return inertia('Admin/ProductCategories/Show', [
            'category' => ProductCategory::findOrFail($id)
        ]);
    }

    public function edit(string $id)
    {
        return inertia('Admin/ProductCategories/Edit', [
            'category' => ProductCategory::findOrFail($id)
        ]);
    }

    public function update(Request $request, ProductCategory $productCategory)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:product_categories,name,' . $productCategory->id,
        ]);
        $data['slug'] = Str::slug($data['name']);
        $productCategory->update($data);
        return redirect()->route('admin.product-categories.index')
            ->with('success', 'Kategori produk berhasil diperbarui.');
    }

    public function destroy(ProductCategory $productCategory)
    {
        if($productCategory->products()->count() > 0) {
            return redirect()->back()->with
            ('error', 'Kategori produk tidak dapat dihapus karena masih memiliki produk terkait.');
        }

        $productCategory->delete();

        return redirect()->route('admin.product-categories.index')
            ->with('success', 'Kategori produk berhasil dihapus.');
    }
}
