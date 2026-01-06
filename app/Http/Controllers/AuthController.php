<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //

    function signup(SignupRequest $request) {
        $data = $request->validated();

        $user = User::create([
            'name'=>$data['username'],
            'email'=>$data['email'],
            'password'=>bcrypt($data['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user'=>$user,
            'token'=>$token
        ]);
    }

    function login(LoginRequest $request){
        $credentials = $request->validated();

        if(!Auth::attempt($credentials)){
           return response()->json([
                'message'=>'The given data was invalid.',
                'errors'=>[
                    'common'=>['The provided credentials are incorrect.']
                ]
           ],401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'user'=>$user,
            'token'=>$token
        ]);

    }
    
    function logout(Request $request){
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response()->json([
            'message'=>'Logged out successfully'
        ]);
    }
}
