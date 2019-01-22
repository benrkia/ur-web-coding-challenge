<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Shop;
use App\User;

use App\Http\Resources\Shop as ShopResource;

class ShopController extends Controller
{
    /**
     * @return Shop[]
     * Get the nearby shops of the authenticated user
    */
    public function index()
    {
        $user_id = Auth::user()->id;

        $shops = Shop::whereDoesntHave('reactions', function ($query) use ($user_id){
            $query->whereIn('reaction_type', ['like', 'deslike']);
            $query->where('user_id', $user_id);
        })
        ->orderBy('distance', 'asc')
        ->paginate(10);

        return ShopResource::collection($shops);
    }

    /**
     * @return Shop[]
     * Get the preferred shops list of the authenticated user
    */
    public function preferred()
    {
        $user_id = Auth::user()->id;

        $shops = Shop::whereHas('reactions', function ($query) use ($user_id){
            $query->where('reaction_type', 'like');
            $query->where('user_id', $user_id);
        })
        ->orderBy('distance', 'asc')
        ->paginate(10);

        return ShopResource::collection($shops);
    }

    /**
     * @param Request
     * @return Response
     * Attach like reaction to the given shop, by the authenticated user
    */
    public function like(Request $request){

        $shop_id = $request->shop_id;

        if(!isset($shop_id)
            || !Shop::find($shop_id)){
            return response()->json([ 'data' => 
                ['error' => 'The given data was invalid.'],
            ], 422);
        }

        $user = Auth::user();
        
        $user->reactions()->attach($shop_id, [
            'reaction_type' => 'like'
        ]);

        return response()->json([ 'data' => 
            ['message' => 'shop got a like'],
        ], 201);

    }

    /**
     * @param Request
     * @return Response
     * Remove a shop from preferred shops list, unlike a shop
    */
    public function unlike(Request $request){

        $shop_id = $request->shop_id;

        if(!isset($shop_id)
            || !Shop::find($shop_id)){
            return response()->json([ 'data' => 
                ['error' => 'The given data was invalid.'],
            ], 422);
        }

        $user = Auth::user();
        
        $user->reactions()->detach($shop_id);

        return response()->json([ 'data' => 
            ['message' => 'shop unliked'],
        ], 201);

    }

    /**
     * @param Request
     * @return Response
     * Attach deslike reaction to the given shop, by the authenticated user
    */
    public function deslike(Request $request){

        $shop_id = $request->shop_id;

        if(!isset($shop_id)
            || !Shop::find($shop_id)){
            return response()->json([ 'data' => 
                ['error' => 'The given data was invalid.'],
            ], 422);
        }

        $user = Auth::user();
        
        $user->reactions()->attach($shop_id, [
            'reaction_type' => 'deslike'
        ]);

        return response()->json([ 'data' => 
            ['message' => 'shop got a deslike'],
        ], 201);

    }


}
