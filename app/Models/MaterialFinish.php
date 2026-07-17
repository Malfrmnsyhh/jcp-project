<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaterialFinish extends Model
{
    protected $fillable = ['material_id', 'name', 'swatch_hex', 'texture_image'];
}
