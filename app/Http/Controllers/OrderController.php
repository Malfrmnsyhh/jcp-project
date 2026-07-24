<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with(['confirmer', 'items'])->withCount('items');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                  ->orWhere('customer_name', 'like', "%{$search}%")
                  ->orWhere('customer_wa', 'like', "%{$search}%");
            });
        }

        $orders = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return inertia('Admin/Orders/Index', [
            'orders' => $orders,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function show(Order $order)
    {
        $order->load(['items.product', 'confirmer']);

        return inertia('Admin/Orders/Show', [
            'order' => $order
        ]);
    }

    public function confirm(Order $order, Request $request)
    {
        $order->update([
            'status' => 'dikonfirmasi',
            'confirmed_by' => $request->user()->id,
            'confirmed_at' => now(),
        ]);

        return redirect()->route('admin.orders.show', $order)->with('success', 'Order berhasil dikonfirmasi.');
    }

    public function status(Request $request, Order $order)
    {
        $data = $request->validate([
            'status' => 'required|in:baru,dikonfirmasi,menunggu_pembayaran,dibayar,dikirim,selesai,dibatalkan',
        ]);

        $order->update($data);

        return redirect()->route('admin.orders.show', $order)->with('success', 'Status order berhasil diperbarui.');
    }

    public function destroy(Order $order)
    {
        $order->delete();

        return redirect()->route('admin.orders.index')->with('success', 'Order berhasil dihapus.');
    }
}
