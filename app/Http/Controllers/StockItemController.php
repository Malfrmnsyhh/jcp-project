<?php

namespace App\Http\Controllers;

use App\Models\StockItem;
use Illuminate\Http\Request;

class StockItemController extends Controller
{
    public function index()
    {
        $stocks = StockItem::with('updater')->orderBy('created_at', 'desc')->paginate(10);
        return inertia('Admin/Stocks/Index', [
            'stocks' => $stocks
        ]);
    }

    public function create()
    {
        return inertia('Admin/Stocks/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'unit' => 'required|string|max:50',
            'quantity' => 'required|integer|min:0',
            'notes' => 'nullable|string',
        ]);
        $data['updated_by'] = $request->user()->id;
        StockItem::create($data);
        return redirect()->route('admin.stocks.index')->with('success', 'Stock item berhasil ditambahkan.');
    }

    public function edit(StockItem $stockItem)
    {
        return inertia('Admin/Stocks/Edit', [
            'stockItem' => $stockItem
        ]);
    }

    public function update(Request $request, StockItem $stockItem)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'unit' => 'required|string|max:50',
            'quantity' => 'required|integer|min:0',
            'notes' => 'nullable|string',
        ]);
        $data['updated_by'] = $request->user()->id;
        $stockItem->update($data);
        return redirect()->route('admin.stocks.index')->with('success', 'Stock item berhasil diperbarui.');
    }

    public function destroy(StockItem $stockItem)
    {
        $stockItem->delete();
        return redirect()->route('admin.stocks.index')->with('success', 'Stock item berhasil dihapus.');
    }
}
