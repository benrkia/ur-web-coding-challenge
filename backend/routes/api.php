<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'auth:api'], function() {
    Route::get('shops', 'ShopController@index');

    Route::get('shops/preferred', 'ShopController@preferred');

    Route::post('shops/like', 'ShopController@like');

    Route::post('shops/unlike', 'ShopController@unlike');

    Route::post('shops/deslike', 'ShopController@deslike');
});

// Authentication routes

Route::post('register', 'Auth\RegisterController@register');

Route::post('login', 'Auth\LoginController@login');

Route::post('logout', 'Auth\LoginController@logout');
