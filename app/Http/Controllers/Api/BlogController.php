<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogResource;
use App\Models\Blog;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isNull;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{

            $blog = Blog::with('pegawai')->orderBy('id','desc')
                ->where('status','publish')
                ->get();
            $data['blog'] = $blog;

            return response()->json([
                'data' => $data,
                'message' => 'blog',
                'status' => 200,
                'success' => true
            ],200);
        }catch(\Exception $ex){
            return response()->json([
                'message' => "Error Fetching Blog",
                'status' => 200,
                'success' => true
            ], 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $blog = Blog::with('pegawai')->when(
            $request->slug,
            fn($query) => $query->where('slug', $request->slug)
        )->first();
        // dd($blog);
        if($blog == null){
            return response()->json([
                'message' => 'data not found',
                'status' => 404,
                'success' => false,
            ],200);
        }

        return response()->json($blog,200);
        // $blog = $blog->load('pegawai');

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        //
    }
}
