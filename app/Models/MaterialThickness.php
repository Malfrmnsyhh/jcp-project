<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaterialThickness extends Model
{
    protected $fillable = ['material_id', 'label', 'sort_order'];

    public function material()
    {
        return $this->belongsTo(Material::class);
    }
}
