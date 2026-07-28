<?php

namespace App\Http\Requests;

/**
 * Aturan validasi update identik dengan store; override rules() di sini
 * jika suatu saat keduanya perlu berbeda.
 */
class UpdateProductRequest extends StoreProductRequest {}
