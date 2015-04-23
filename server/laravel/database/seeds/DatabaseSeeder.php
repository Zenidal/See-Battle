<?php

use Illuminate\Database\Seeder;
use App\Role;

class DatabaseSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $this->call('RoleTableSeeder');
        $this->command->info('Seeding was succesfull!');
    }

}

class RoleTableSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::table('roles')->delete();
        $role = new Role;
        $role->name = 'user';
        $role->save();
    }

}