<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::orderBy('created_at', 'desc')->paginate(10);
        return inertia('Admin/Testimonials/Index', [
            'testimonials' => $testimonials
        ]);
    }

    public function create()
    {
        return inertia('Admin/Testimonials/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_role' => 'required|string|max:255',
            'content' => 'required|string',
            'is_published' => 'required|boolean',
            'product_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096',
        ]);
        if ($request->hasFile('product_image')) {
            $path = $request->file('product_image')->store('testimonials', 'public');
            $data['product_image'] = '/storage/' . $path;
        }

        Testimonial::create($data);
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial berhasil ditambahkan.');
    }

    public function edit(Testimonial $testimonial)
    {
        return inertia('Admin/Testimonials/Edit', [
            'testimonial' => $testimonial
        ]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $data = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_role' => 'required|string|max:255',
            'content' => 'required|string',
            'is_published' => 'required|boolean',
            'product_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096',
        ]);
        if ($request->hasFile('product_image')) {
            if ($testimonial->product_image) {
                $old = str_replace('/storage/', '', $testimonial->product_image);
                Storage::disk('public')->delete($old);
            }
            $path = $request->file('product_image')->store('testimonials', 'public');
            $data['product_image'] = '/storage/' . $path;
        }

        $testimonial->update($data);
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial berhasil diperbarui.');
    }

    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->product_image) {
            $old = str_replace('/storage/', '', $testimonial->product_image);
            Storage::disk('public')->delete($old);
        }

        $testimonial->delete();
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial berhasil dihapus.');
    }
}
