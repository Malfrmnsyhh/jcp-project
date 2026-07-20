<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductCategoryPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_product_categories_page_can_be_rendered_for_authenticated_user(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get('/admin/product-categories');
        $response->assertStatus(200);
    }
}
