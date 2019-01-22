<?php

use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'email' => 'user@user.com',
        'password' => Hash::make('user@password'),
    ];
});
