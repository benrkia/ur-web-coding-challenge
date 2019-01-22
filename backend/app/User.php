<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'password', 'api_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * @return api_token
     * Generates random token and attach it to the user
    */
    public function generateToken()
    {
        $this->api_token = str_random(60);
        $this->save();

        return $this->api_token;
    }

    /**
     * Define the many to many relationship between shops & users
     * each shop can be either {liked} or {desliked} by a user
    */
    public function reactions(){
        
        return $this->belongsToMany('App\Shop', 'users_reactions')
                ->using('App\UsersReactions')
                ->as('reactions')
                ->withPivot('reaction_type')
                ->withTimestamps();
    }
}
