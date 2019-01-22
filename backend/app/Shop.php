<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{

    /**
     * @var array
     * The attributes that will be used in Shop::create & Shop::update
    */
    protected $fillable = [
        'name', 'distance',
    ];


    /**
     * define the many to many relationship between shops & users
     * each user can either {like} or {deslike} a shop
    */
    public function reactions(){
        return $this->belongsToMany('App\User', 'users_reactions')
                ->using('App\UsersReactions')
                ->as('reactions')
                ->withPivot('reaction_type')
                ->withTimestamps();
    }
}
