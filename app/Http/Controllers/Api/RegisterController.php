<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseController as BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Validator;

class RegisterController extends BaseController
{
    // public function register(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'name' => 'required',
    //         'email' => 'required|email',
    //         'password' => 'required',
    //         'c_password' => 'required|same:password',
    //     ]);

    //     if ($validator->fails()) {
    //         return $this->sendError('Validation Error.', $validator->errors());
    //     }

    //     $input = $request->all();
    //     $input['password'] = bcrypt($input['password']);
    //     $user = User::create($input);
    //     $success['token'] =  $user->createToken('MyApp')->plainTextToken;
    //     $success['name'] =  $user->name;

    //     return $this->sendResponse($success, 'User register successfully.');
    // }

    public function login(Request $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password]))
        {
            $user = Auth::user();
            $success['token']   = $user->createToken('MyApp')->plainTextToken;
            $success['name'] =  $user->name;

            return $this->sendResponse($success, 'User login successfully.');

        }else{
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        }
    }

    public function getUser(Request $request){
        if($request->user()->role !== "pegawai"){
            $user = $request->user()->load('pegawai', 'pegawai.pesanan', 'pegawai.onOutlet','pegawai.onOutlet.outlet');
            $userCollection = collect($user);

            $activeOutlet = $this->checkActiveOutlet();
            $arr = [
                'active' => $activeOutlet
            ];
            $userCollection->put('active', $activeOutlet);
            return $userCollection;
        }
        return $request->user()->load('pegawai', 'pegawai.pesanan', 'pegawai.onOutlet','pegawai.onOutlet.outlet');
    }

    public function logout(Request $request)
    {
        auth()->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'logout'
        ],200);
        // if(auth()){
        //     auth()->user()->tokens()->delete();

        //     return response()->json([
        //         'message' => 'User Logout Successfully',
        //         'status' => 200,
        //     ], 200);
        // }else{
        //     return response()->json([
        //         'message' => 'User Not Found',
        //         'status' => 200
        //     ], 200);
        // }
    }

    public function checkActiveOutlet()
    {
        $idOutlet = '';
        $cacheName = auth()->user()->id . "-" . "activeOutlet";
        if(Cache::has($cacheName))
        {
            $cacheOutlet = Cache::get($cacheName);
            $idOutlet = $cacheOutlet['id_outlet'];

        }else{
            $idOutlet = auth()->user()->pegawai->onOutlet->id_outlet ? auth()->user()->pegawai->onOutlet->id_outlet : '';
        }

        return $idOutlet;
    }
}
