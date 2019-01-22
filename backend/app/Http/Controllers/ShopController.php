<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Shop;
use App\User;

class ShopController extends Controller
{
    /**
     * @return Shop[]
     * Get the nearby shops of the authenticated user
    */
    public function index()
    {
        $user_id = 1;

        $shops = Shop::whereDoesntHave('reactions', function ($query) use ($user_id){
            $query->whereIn('reaction_type', ['like', 'deslike']);
            $query->where('user_id', $user_id);
        })
        ->orderBy('distance', 'asc')
        ->paginate(4);

        return $shops;
    }

    /**
     * @return Shop[]
     * Get the preferred shops list of the authenticated user
    */
    public function preferred()
    {
        $user_id = 1;

        $shops = Shop::whereHas('reactions', function ($query) use ($user_id){
            $query->where('reaction_type', 'like');
            $query->where('user_id', $user_id);
        })
        ->orderBy('distance', 'asc')
        ->get();

        return $shops;
    }

    /**
     * @param Request
     * @return Response
     * Attach like reaction to the given shop, by the authenticated user
    */
    public function like(Request $request){

        $shop_id = $request->shop_id;

        if(!isset($shop_id)){
            return response()->json([
                'message' => 'The given data was invalid.',
            ], 422);
        }

        $user = User::find(1);
        
        $user->reactions()->attach($shop_id, [
            'reaction_type' => 'like'
        ]);

        return response()->json([
            'done' => 'shop liked :)'
        ], 201);

    }

    /**
     * @param Request
     * @return Response
     * Remove a shop from preferred shops list, unlike a shop
    */
    public function unlike(Request $request){

        $shop_id = $request->shop_id;

        if(!isset($shop_id)){
            return response()->json([
                'message' => 'The given data was invalid.',
            ], 422);
        }

        $user = User::find(1);
        
        $user->reactions()->detach($shop_id);

        return response()->json([
            'done' => 'shop unliked :('
        ], 200);

    }

    /**
     * @param Request
     * @return Response
     * Attach deslike reaction to the given shop, by the authenticated user
    */
    public function deslike(Request $request){

        $shop_id = $request->shop_id;

        if(!isset($shop_id)){
            return response()->json([
                'message' => 'The given data was invalid.',
            ], 422);
        }

        $user = User::find(1);
        
        $user->reactions()->attach($shop_id, [
            'reaction_type' => 'deslike'
        ]);

        return response()->json([
            'done' => 'shop deslike :)'
        ], 201);

    }


}
