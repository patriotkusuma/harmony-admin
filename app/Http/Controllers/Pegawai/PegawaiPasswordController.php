<?php

namespace App\Http\Controllers\Pegawai;

use App\Http\Controllers\Controller;
use App\Models\Pegawai;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PegawaiPasswordController extends Controller
{


    public function pegawaiUpdatePassword(Request $request, Pegawai $pegawai)
    {
        if($request->user()->role!='admin'){
            return back();
        }

        $validated = $request->validate([
            'password' => ['required', Password::defaults(),'confirmed']
        ]);

        $pegawai->user->update([
            'password' => Hash::make($validated['password'])
        ]);

        return back();
    }
}
