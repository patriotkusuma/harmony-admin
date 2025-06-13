<?php

namespace App\Http\Controllers;

use App\Models\Jabatan;
use App\Http\Requests\StoreJabatanRequest;
use App\Http\Requests\UpdateJabatanRequest;
use Inertia\Inertia;

class JabatanController extends Controller
{
    private $jabatans;

    public function __construct()
    {
        $this->jabatans = Jabatan::query();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jabatans = $this->jabatans->get();
        return Inertia::render('Harmony/Jabatan/Index', compact([
            'jabatans'
        ]));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJabatanRequest $request)
    {
        try{

            $this->jabatans->create($request->all());

            // return response()->json([
            //     'message'=>'Jabatan created successfully 🥰',
            //     'status'=>200,
            // ],200);
            return back()->with('success', 'Jabatan created successfully 🥰');
        }catch(\Exception $ex){
            // return response()->json([
            //     'error' => 'Error creating jabatan',
            //     'data' => $ex,
            //     'status' => 401,
            // ], 200);
            return back()->with('error', 'Error creating jabatan');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Jabatan $jabatan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jabatan $jabatan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJabatanRequest $request, Jabatan $jabatan)
    {
        $jabatan->update($request->all());

        return back()->with('success', 'Jabatan updated Successfully 🥰');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jabatan $jabatan)
    {
        $jabatan->delete();
        return back()->with('success', 'Delete jabatan successfully 🧹');
    }
}
