<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderPublicController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'qty' => 'required|integer|min:1',
            'customer_name' => 'required|string|max:255',
            'customer_wa' => 'required|string|max:50',
            'customer_note' => 'nullable|string|max:1000',
        ]);

        $product = Product::findOrFail($validated['product_id']);

        $order = DB::transaction(function () use ($validated, $product) {
            $today = now()->format('Y-m-d');
            $todayCount = Order::whereDate('created_at', $today)->count() + 1;
            $orderNumber = 'JCP-' . now()->format('Ymd') . '-' . str_pad($todayCount, 4, '0', STR_PAD_LEFT);

            $newOrder = Order::create([
                'order_number' => $orderNumber,
                'customer_name' => $validated['customer_name'],
                'customer_wa' => $validated['customer_wa'],
                'customer_note' => $validated['customer_note'] ?? null,
                'status' => 'baru',
            ]);

            $price = $product->price ?? 0;
            $qty = (int) $validated['qty'];
            $subtotal = $price * $qty;

            OrderItem::create([
                'order_id' => $newOrder->id,
                'product_id' => $product->id,
                'product_name' => $product->name,
                'price' => $price,
                'qty' => $qty,
                'subtotal' => $subtotal,
            ]);

            return $newOrder;
        });

        return response()->json([
            'success' => true,
            'message' => 'Pesanan berhasil dibuat',
            'order_number' => $order->order_number,
            'order' => $order,
        ], 201);
    }
}
