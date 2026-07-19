<?php

namespace App\Http\Controllers;

use App\Models\MaterialCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MaterialCategoryController extends Controller
{
    public function index()
    {
        $categories = MaterialCategory::orderBy('created_at', 'desc')->paginate(10);
        return inertia('Admin/MaterialCategories/Index', [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return inertia('Admin/MaterialCategories/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:material_categories,name',
        ]);

        $data['slug'] = Str::slug($data['name']);
        MaterialCategory::create($data);
        return redirect()->route('admin.material-categories.index')->with('success', 'Kategori bahan berhasil ditambahkan.');
    }

    public function show(MaterialCategory $materialCategory)
    {
        return inertia('Admin/MaterialCategories/Show', [
            'category' => $materialCategory->load('materials')
        ]);
    }

    public function edit(MaterialCategory $materialCategory)
    {
        return inertia('Admin/MaterialCategories/Edit',[
            'category' => $materialCategory
        ]);
    }

    public function update(Request $request, MaterialCategory $materialCategory)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:material_categories,name,' . $materialCategory->id,
        ]);

        $data['slug'] = Str::slug($data['name']);
        $materialCategory->update($data);
        return redirect()->route('admin.material-categories.index')
            ->with('success', 'Kategori bahan berhasil diperbarui.');
    }

    public function destroy(MaterialCategory $materialCategory)
    {
        if($materialCategory->materials()->count() > 0) {
            return redirect()->route('admin.material-categories.index')
                ->with('error', 'Kategori bahan tidak dapat dihapus karena masih memiliki bahan terkait.');
        }

        $materialCategory->delete();
        return redirect()->route('admin.material-categories.index')
            ->with('success', 'Kategori bahan berhasil dihapus.');
    }
}
