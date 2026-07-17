<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
    protected $fillable = [
        'name',
        'type',
        'work_area',
        'description',
        'image_path',
        'is_active',
    ];
}
