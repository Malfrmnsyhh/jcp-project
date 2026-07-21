<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioItem extends Model
{
    protected $fillable = [
        'title',
        'category',
        'client_name',
        'description',
        'image_path',
        'sort_order',
    ];
}
