<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\CategoryTypesTableSeeder;
use Database\Seeders\CategoryTableSeeder;
use Database\Seeders\PostTypesTableSeeder;
use Database\Seeders\PostTableSeeder;
use Database\Seeders\PostTranslationsTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CategoryTypesTableSeeder::class,
            CategoryTableSeeder::class,
            PostTypesTableSeeder::class,
            PostTableSeeder::class,
            PostTranslationsTableSeeder::class,
        ]);
    }
}
