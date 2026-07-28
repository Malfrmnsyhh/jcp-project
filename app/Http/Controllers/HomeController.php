<?php

namespace App\Http\Controllers;

use App\Models\Machine;
use App\Models\Material;
use App\Models\PortfolioItem;
use App\Models\Testimonial;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home', [
            'portfolios' => PortfolioItem::latest()->take(6)->get(),
            'testimonials' => $this->testimonials(),
            'machines' => Machine::where('is_active', true)->latest()->get(),
            'materials' => $this->materials(),
        ]);
    }

    private function testimonials()
    {
        return Testimonial::where('is_published', true)
            ->latest()
            ->take(6)
            ->get()
            ->map(fn (Testimonial $testimonial) => [
                'customer_name' => $testimonial->customer_name,
                'customer_role' => $testimonial->customer_role,
                'content' => $testimonial->content,
                'product_image' => $testimonial->product_image,
            ]);
    }

    private function materials()
    {
        return Material::with([
            'category',
            'thicknesses' => fn ($query) => $query->orderBy('sort_order'),
            'finishes',
        ])
            ->get()
            ->map(fn (Material $material) => [
                'id' => $material->id,
                'category' => $material->category?->name ?? 'Lainnya',
                'name' => $material->name,
                'color_hex' => $material->color_hex ?? '#0ea5e9',
                'short_description' => Str::limit($material->description, 60),
                'description' => $material->description,
                'thickness_options' => $material->thicknesses->pluck('label')->toArray(),
                'finishes' => $material->finishes->map(fn ($finish) => [
                    'name' => $finish->name,
                    'swatch' => $finish->swatch_hex ?? '#cccccc',
                ])->toArray(),
            ]);
    }
}
