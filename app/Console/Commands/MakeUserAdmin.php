<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class MakeUserAdmin extends Command
{
    protected $signature = 'user:admin {email} {--revoke : Cabut akses admin, bukan memberikannya}';

    protected $description = 'Berikan atau cabut akses panel admin untuk sebuah user';

    public function handle(): int
    {
        $user = User::where('email', $this->argument('email'))->first();

        if (! $user) {
            $this->error("User dengan email {$this->argument('email')} tidak ditemukan.");

            return self::FAILURE;
        }

        $user->is_admin = ! $this->option('revoke');
        $user->save();

        $this->info($user->is_admin
            ? "{$user->email} sekarang admin."
            : "Akses admin {$user->email} dicabut.");

        return self::SUCCESS;
    }
}
