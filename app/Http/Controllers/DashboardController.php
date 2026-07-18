<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\StockItem;
use App\Models\Testimonial;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $newOrdersCount = Order::where('status', 'baru')->count();
        $activeProductsCount = Product::where('is_active', true)->count();
        $lowStockCount = StockItem::where('quantity', '<', 5)->count();
        $pendingTestimonialsCount = Testimonial::where('is_published', false)->count();

        $latestOrders = Order::orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'new_orders' => $newOrdersCount,
                'active_products' => $activeProductsCount,
                'low_stock' => $lowStockCount,
                'pending_testimonials' => $pendingTestimonialsCount,
            ],
            'latestOrders' => $latestOrders,
        ]);
    }
}
