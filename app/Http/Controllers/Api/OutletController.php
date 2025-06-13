<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Outlet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class OutletController extends Controller
{
    private $outlet;
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $this->outlet = Outlet::query();
    }
    public function index()
    {
        try{
            $outlets = $this->outlet->get();
            $activeOutlet = $this->checkActiveOutlet();

            $data = [
                'outlets' => $outlets,
                'active'  => $activeOutlet
            ];
            return response()->json([
                'message' => 'Fetch outlet successfully',
                'data' => $data,
                'status' => 200
            ], 200);
        }catch(\Exception $ex){
            return response()->json([
                'message' => "Error",
                "status" => 404,
            ], 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $cacheName = auth()->user()->id . "-" . "activeOutlet";
        if(Cache::has($cacheName)){
            Cache::delete($cacheName);
        }
        Cache::remember($cacheName, now()->addDay(1), function() use ($request){
            $data = [
                'id_user' => auth()->user()->id,
                'id_outlet' => $request->id
            ];

            return $data;
        }  );

        $outlets = $this->outlet->get();
        $activeOutlet = $this->checkActiveOutlet();

        $data = [
            'outlets' => $outlets,
            'active'  => $activeOutlet
        ];
        return response()->json([
            'message'=>'message',
            'data' => $data,
            'status'=>200
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Outlet $outlet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Outlet $outlet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Outlet $outlet)
    {
        //
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
