<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'order_number',
        'customer_name',
        'customer_wa',
        'customer_note',
        'status',
        'confirmed_by',
        'confirmed_at',
    ];
}
