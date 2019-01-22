<?php

use Faker\Generator as Faker;

$factory->define(App\Shop::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
        'distance' => $faker->randomFloat(2, $min = 100, $max = 500),
    ];
});
