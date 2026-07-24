<?php

namespace App\Http\Controllers;

use App\Models\StockItem;
use Illuminate\Http\Request;

class StockItemController extends Controller
{
    public function index(Request $request)
    {
        $query = StockItem::with('updater');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%")
                  ->orWhere('notes', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        $stocks = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        $categories = StockItem::select('category')->distinct()->pluck('category');

        return inertia('Admin/Stocks/Index', [
            'stocks' => $stocks,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function create()
    {
        $categories = StockItem::select('category')->distinct()->pluck('category');

        return inertia('Admin/Stocks/Create', [
            'existingCategories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'unit' => 'required|string|max:50',
            'quantity' => 'required|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        $data['updated_by'] = $request->user()->id;
        StockItem::create($data);

        return redirect()->route('admin.stocks.index')->with('success', 'Stok item berhasil ditambahkan.');
    }

    public function edit(StockItem $stockItem)
    {
        $categories = StockItem::select('category')->distinct()->pluck('category');

        return inertia('Admin/Stocks/Edit', [
            'stockItem' => $stockItem,
            'existingCategories' => $categories
        ]);
    }

    public function update(Request $request, StockItem $stockItem)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'unit' => 'required|string|max:50',
            'quantity' => 'required|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        $data['updated_by'] = $request->user()->id;
        $stockItem->update($data);

        return redirect()->route('admin.stocks.index')->with('success', 'Stok item berhasil diperbarui.');
    }

    public function destroy(StockItem $stockItem)
    {
        $stockItem->delete();

        return redirect()->route('admin.stocks.index')->with('success', 'Stok item berhasil dihapus.');
    }
}
