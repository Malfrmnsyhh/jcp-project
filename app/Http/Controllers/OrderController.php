<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('confirmer')->orderBy('created_at', 'desc')->paginate(10);
        return inertia('Admin/Orders/Index', [
            'orders' => $orders
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

    public function show(Order $order)
    {
        return inertia('Admin/Orders/Show', [
            'order' => $order->load(['items', 'confirmer'])
        ]);
    }

    public function status(Request $request, Order $order)
    {
        $data = $request->validate([
            'status' => 'required|in:baru,dikonfirmasi,menunggu_pembayaran,dibayar,dikirim,selesai,dibatalkan',
        ]);
        $order->update($data);
        return redirect()->route('admin.orders.show', $order)->with('success', 'Status order berhasil diperbarui.');
    }
}
