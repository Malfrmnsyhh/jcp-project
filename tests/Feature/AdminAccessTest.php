<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class AdminAccessTest extends TestCase
{
    use RefreshDatabase;

    public static function adminRoutes(): array
    {
        return [
            'dashboard' => ['/dashboard'],
            'products' => ['/admin/products'],
            'materials' => ['/admin/materials'],
            'machines' => ['/admin/machines'],
            'portfolio' => ['/admin/portfolio'],
            'testimonials' => ['/admin/testimonials'],
            'stocks' => ['/admin/stocks'],
            'orders' => ['/admin/orders'],
        ];
    }

    #[DataProvider('adminRoutes')]
    public function test_guests_are_redirected_to_login(string $url): void
    {
        $this->get($url)->assertRedirect('/login');
    }

    #[DataProvider('adminRoutes')]
    public function test_non_admin_users_are_forbidden(string $url): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get($url)->assertForbidden();
    }

    #[DataProvider('adminRoutes')]
    public function test_admin_users_are_allowed(string $url): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)->get($url)->assertOk();
    }

    public function test_newly_registered_users_are_not_admins(): void
    {
        $this->post('/register', [
            'name' => 'Calon Penyusup',
            'email' => 'penyusup@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertFalse(User::where('email', 'penyusup@example.com')->first()->is_admin);
        $this->get('/admin/products')->assertForbidden();
    }
}
