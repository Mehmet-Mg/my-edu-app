<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsDemoSeeder extends Seeder
{
/**
     * Create the initial roles and permissions.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'edit articles']);
        Permission::create(['name' => 'delete articles']);
        Permission::create(['name' => 'publish articles']);
        Permission::create(['name' => 'unpublish articles']);

        // create roles and assign existing permissions
        $role1 = Role::create(['name' => 'writer']);
        $role1->givePermissionTo('edit articles');
        $role1->givePermissionTo('delete articles');

        $role2 = Role::create(['name' => 'admin']);
        $role2->givePermissionTo('publish articles');
        $role2->givePermissionTo('unpublish articles');

        $role3 = Role::create(['name' => 'Super-Admin']);
        // gets all permissions via Gate::before rule; see AuthServiceProvider

        $role4 = Role::create(['name' => 'teacher']);
        $role5 = Role::create(['name' => 'student']);

        // create demo users
        $user = \App\Models\User::factory()->create([
            'name' => 'ExampleUser',
            'first_name' => 'Example',
            'last_name' => 'User',
            'email' => 'tester@example.com',
        ]);
        $user->assignRole($role1);

        $user = \App\Models\User::factory()->create([
            'name' => 'ExampleAdminUser',
            'first_name' => 'ExampleAdminUser',
            'last_name' => 'ExampleAdminUser',
            'email' => 'admin@example.com',
        ]);
        $user->assignRole($role2);

        $user = \App\Models\User::factory()->create([
            'name' => 'Example Super-Admin User',
            'first_name' => 'Example Super-Admin User',
            'last_name' => 'Example Super-Admin User',
            'email' => 'superadmin@example.com',
        ]);
        $user->assignRole($role3);


        $user = \App\Models\User::factory()->create([
            'name' => 'Example Teacher User',
            'first_name' => 'Example Teacher User',
            'last_name' => 'Example Teacher User',
            'email' => 'teacher@example.com',
        ]);
        $user->assignRole($role4);


        $user = \App\Models\User::factory()->create([
            'name' => 'Example Student User',
            'first_name' => 'Example Student User',
            'last_name' => 'Example Student User',
            'email' => 'student@example.com',
        ]);
        $user->assignRole($role5);

                $user = \App\Models\User::factory()->create([
            'name' => 'Example Student User',
            'first_name' => 'Example Student User',
            'last_name' => 'Example Student User',
            'email' => 'student1@example.com',
        ]);
        $user->assignRole($role5);

                $user = \App\Models\User::factory()->create([
            'name' => 'Example Student User',
            'first_name' => 'Example Student User',
            'last_name' => 'Example Student User',
            'email' => 'student2@example.com',
        ]);
        $user->assignRole($role5);

                $user = \App\Models\User::factory()->create([
            'name' => 'Example Student User',
            'first_name' => 'Example Student User',
            'last_name' => 'Example Student User',
            'email' => 'student3@example.com',
        ]);
        $user->assignRole($role5);

                $user = \App\Models\User::factory()->create([
            'name' => 'Example Student User',
            'first_name' => 'Example Student User',
            'last_name' => 'Example Student User',
            'email' => 'student4@example.com',
        ]);
        $user->assignRole($role5);

                $user = \App\Models\User::factory()->create([
            'name' => 'Example Student User',
            'first_name' => 'Example Student User',
            'last_name' => 'Example Student User',
            'email' => 'student5@example.com',
        ]);
        $user->assignRole($role5);
    }

}