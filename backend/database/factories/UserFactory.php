<?php

use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => 'user user',
        'email' => 'user@user.com',
        'email_verified_at' => now(),
        'password' => Hash::make('user@password'),
    ];
});
