<?php

namespace App\Http\Controllers;

use App\Models\PortfolioItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PortfolioController extends Controller
{
    public function index()
    {
        $portfolioItems = PortfolioItem::orderBy('sort_order')->orderBy('created_at', 'desc')->paginate(10);
        return inertia('Admin/Portfolio/Index', [
            'portfolioItems' => $portfolioItems
        ]);
    }

    public function create()
    {
        return inertia('Admin/Portfolio/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'sort_order' => 'nullable|integer',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('portfolio', 'public');
            $data['image_path'] = '/storage/' . $path;
        }

        PortfolioItem::create($data);
        return redirect()->route('admin.portfolio.index')->with('success', 'Item portofolio berhasil ditambahkan.');
    }

    public function edit(PortfolioItem $portfolio)
    {
        return inertia('Admin/Portfolio/Edit', [
            'portfolio' => $portfolio
        ]);
    }

    public function update(Request $request, PortfolioItem $portfolio)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'sort_order' => 'nullable|integer',
        ]);

        if ($request->hasFile('image')) {
            if ($portfolio->image_path) {
                $oldImagePath = str_replace('/storage/', '', $portfolio->image_path);
                Storage::disk('public')->delete($oldImagePath);
            }
            $path = $request->file('image')->store('portfolio', 'public');
            $data['image_path'] = '/storage/' . $path;
        }

        $portfolio->update($data);
        return redirect()->route('admin.portfolio.index')->with('success', 'Item portofolio berhasil diperbarui.');
    }

    public function destroy(PortfolioItem $portfolio)
    {
        if ($portfolio->image_path) {
            $oldImagePath = str_replace('/storage/', '', $portfolio->image_path);
            Storage::disk('public')->delete($oldImagePath);
        }

        $portfolio->delete();
        return redirect()->route('admin.portfolio.index')->with('success', 'Item portofolio berhasil dihapus.');
    }
}
