<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Testimonial extends Model
{
    protected $fillable = [
        'customer_name',
        'customer_role',
        'content',
        'product_image',
        'is_published',
    ];

    public function getProductImageUrlAttribute()
    {
        if (! $this->product_image) {
            return null;
        }

        // If stored with /storage/ prefix keep it, otherwise generate url from disk
        if (str_starts_with($this->product_image, '/storage/')) {
            return $this->product_image;
        }

        return Storage::disk('public')->url($this->product_image);
    }
}
