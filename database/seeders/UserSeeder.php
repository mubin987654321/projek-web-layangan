<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin 
        User::create([
            'name'     => 'Admin Lomba',
            'email'    => 'adminlomba@gmail.com',  // ← UBAH
            'password' => Hash::make('adminlomba123'),  // ← UBAH
            'role'     => 'admin',
            'phone'    => '08111000001',
        ]);

        // Juri
        $juries = [
            ['Dr. Budi Santoso',   'juri1@gmail.com',    'juri1password'],
            ['Ir. Siti Rahayu',    'juri2@gmail.com',    'juri2password'],
            ['Ahmad Fauzi, M.Sn',  'juri3@gmail.com',    'juri3password'],
            ['Dian Purnama',       'juri4@gmail.com',    'juri4password'],
            ['Rudi Hartono',       'juri5@gmail.com',    'juri5password'],
        ];

        foreach ($juries as $jury) {
            User::create([
                'name'     => $jury[0],
                'email'    => $jury[1],  
                'password' => Hash::make($jury[2]), 
                'role'     => 'jury',
                'phone'    => '0812345678' . rand(1, 9),
            ]);
        }

        // Peserta
        $participants = [
            ['name' => 'Andi Pratama',   'email' => 'peserta1@gmail.com'],
            ['name' => 'Dewi Lestari',   'email' => 'peserta2@gmail.com'],
            ['name' => 'Rizky Fauzan',   'email' => 'peserta3@gmail.com'],
            ['name' => 'Sari Wahyuni',   'email' => 'peserta4@gmail.com'],
            ['name' => 'Bagas Kurniawan', 'email' => 'peserta5@gmail.com'],
            ['name' => 'Fajar Nugroho',  'email' => 'peserta6@gmail.com'],
            ['name' => 'Nina Oktaviani', 'email' => 'peserta7@gmail.com'],
            ['name' => 'Putra Mahendra', 'email' => 'peserta8@gmail.com'],
            ['name' => 'Yuni Kartika',   'email' => 'peserta9@gmail.com'],
            ['name' => 'Rama Saputra',   'email' => 'peserta10@gmail.com'],
        ];

        foreach ($participants as $p) {
            User::create([
                ...$p,
                'password' => Hash::make('password'),
                'role'     => 'user',
            ]);
        }
    }
}
