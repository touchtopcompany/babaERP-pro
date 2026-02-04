<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@c2z.com'],
            [
                'name' => 'Admin',
                'lastname' => 'User',
                'username' => 'admin_c2z',
                'phone' => 'admin_c2z',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
            ]
        );
    }
}
