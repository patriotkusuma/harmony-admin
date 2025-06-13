<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Api\BaseController as BaseController;
use Illuminate\Http\Request;

class AuthController extends BaseController
{
    public function logout(Request $request)
    {
        // auth()->user()->currentAccessToken()->delete();

        $response = $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' =>'Logout',
            'result' => $response,
        ],200);
    }

}
