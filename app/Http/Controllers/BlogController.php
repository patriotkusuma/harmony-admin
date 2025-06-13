<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Http\Requests\Blog\StoreBlogRequest;
use App\Http\Requests\Blog\UpdateBlogRequest;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Blog::orderBy('id', 'desc')->get();
        return Inertia::render('Harmony/Blog/Index', compact('blogs'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Harmony/Blog/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogRequest $request)
    {
        $thumbnail = '';
        if($request->hasFile('thumbnail')){
            $extension = $request->file('thumbnail')->extension();
            $md5name = md5_file($request->file('thumbnail')->getRealPath());
            $fileName = 'harmony_laundry_' . $md5name . '.' . $extension;
            $thumbnail = $request->file('thumbnail')->storeAs('/posting', $fileName, 'uploads');

        }

        $blog = new Blog();
        $blog->title = $request->title;
        $blog->user_id = auth()->user()->id;
        $blog->slug = $this->checkSlug($request->slug);
        $blog->meta_title = $request->meta_title;
        $blog->meta_desc = $request->meta_desc;
        $blog->thumbnail = $thumbnail != '' ? URL::asset('storage/media/'.$thumbnail) : '';
        $blog->content = $request->content;
        $blog->status = $request->status;
        $blog->save();

        return redirect()->route('blog.index')->with('success', 'Blog Has Been Saved');

    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        return Inertia::render('Harmony/Blog/Create', compact('blog'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlogRequest $request, Blog $blog)
    {

        $thumbnail = $blog->thumbnail;

        if($request->hasFile('thumbnail')){

            $extension = $request->file('thumbnail')->extension();
            $md5name = md5_file($request->file('thumbnail')->getRealPath());
            $fileName = 'harmony_laundry_' . $md5name . '.' . $extension;
            $thumbnail = $request->file('thumbnail')->storeAs('/posting', $fileName, 'uploads');
            $thumbnail = URL::asset('/blog/'.$thumbnail);
        }

        $blog->update([
            'title' => $request->title,
            'user_id' => auth()->user()->id,
            'slug' => $request->slug,
            'meta_title' => $request->meta_title,
            'meta_desc' => $request->meta_desc,
            'content' => $request->content,
            'status' => $request->status,
            'thumbnail' => $thumbnail != '' ? $thumbnail : ''
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        $blog->delete();
    }

    function checkSlug($slug) {
        $slug = strtolower($slug);
        $slug = str_replace(' ', '-', $slug);
        $slug = preg_replace('/[^a-z0-9\-]/','', $slug);
        $slug = preg_replace('/-+/', '-', $slug);
        $slug = trim($slug, '-');

        $blog = Blog::where('slug', $slug)->get();



        if(count($blog) != 0){
            return $slug .  '-1';
        }else{
            return $slug;
        }

    }
}
