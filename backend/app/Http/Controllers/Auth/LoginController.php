<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }


    /**
     * @param Request
     * @return Response
     * Override the login method
     * Add the token to the user
    */
    public function login(Request $request)
    {
        $this->validateLogin($request);
        if ($this->attemptLogin($request)) {
            $user = $this->guard()->user();
            $user->generateToken();
            return response()->json([
                'data' => $user->toArray(),
            ]);
        }
        return $this->sendFailedLoginResponse($request);
    }


    /**
     * @param Request
     * @return Response
     * Override the logout method
     * Remove token from the user
    */
    public function logout(Request $request)
    {
        $user = Auth::guard('api')->user();
        if ($user) {
            $user->api_token = null;
            $user->save();
        }
        return response()->json([ 'data' => 'User logged out.' ], 200);
    }


    /**
     * @param Request
     * @return Response
     * Override the sendFailedLoginResponse method
     * Return the error in json format in case of login failure
    */
    protected function sendFailedLoginResponse(Request $request)
    {
        $errors = [ 'error' => trans('auth.failed') ];
        return response()->json($errors, 422);
    }
}
