<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $fillable = ['material_category_id', 'name', 'color_hex', 'description'];

    public function category()
    {
        return $this->belongsTo(MaterialCategory::class, 'material_category_id');
    }

    public function thicknesses()
    {
        return $this->hasMany(MaterialThickness::class);
    }

    public function finishes()
    {
        return $this->hasMany(MaterialFinish::class);
    }
}
