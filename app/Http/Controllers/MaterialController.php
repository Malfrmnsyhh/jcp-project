<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\MaterialCategory;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    public function index()
    {
        $materials = Material::with('category')->orderBy('created_at', 'desc')->paginate(10);
        return inertia('Admin/Materials/Index', [
            'materials' => $materials
        ]);
    }

    public function create()
    {
        return inertia('Admin/Materials/Create', [
            'categories' => MaterialCategory::orderBy('name')->get()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'material_category_id' => 'required|exists:material_categories,id',
            'name' => 'required|string|max:255',
            'color_hex' => 'nullable|string|max:20',
            'description' => 'nullable|string',
        ]);
        Material::create($data);
        return redirect()->route('admin.materials.index')->with('success', 'Material berhasil ditambahkan.');
    }

    public function show(Material $material)
    {
        return inertia('Admin/Materials/Show', [
            'material' => $material->load(['category', 'thicknesses', 'finishes'])
        ]);
    }

    public function edit(Material $material)
    {
        return inertia('Admin/Materials/Edit', [
            'material' => $material,
            'categories' => MaterialCategory::orderBy('name')->get()
        ]);
    }

    public function update(Request $request, Material $material)
    {
        $data = $request->validate([
            'material_category_id' => 'required|exists:material_categories,id',
            'name' => 'required|string|max:255',
            'color_hex' => 'nullable|string|max:20',
            'description' => 'nullable|string',
        ]);
        $material->update($data);
        return redirect()->route('admin.materials.index')->with('success', 'Material berhasil diperbarui.');
    }

    public function destroy(Material $material)
    {
        $material->delete();
        return redirect()->route('admin.materials.index')->with('success', 'Material berhasil dihapus.');
    }
}
