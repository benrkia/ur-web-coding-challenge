<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Shop;

class ShopController extends Controller
{
    /**
     * @return Shop[]
     * Return the nearby shops of the authenticated user
    */
    public function index()
    {
        $shop = Shop::findOrFail(1);
        return $shop->reactions;
    }


}
