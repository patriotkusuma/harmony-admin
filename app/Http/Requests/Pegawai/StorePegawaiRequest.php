<?php

namespace App\Http\Requests\Pegawai;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;

class StorePegawaiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {

        return Auth::user()->role != "customer" ? true : false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'nama'  => 'required',
            'alamat'    => 'required',
            'telpon'    => 'required',
            'email'     => 'required|email|unique:'.User::class,
            'gaji'      => 'required',
            'status'    => 'required|in:active,innactive',
            'tanggal_masuk' => 'required',
            'password'  => ['required', 'confirmed', Rules\Password::default()],
        ];
    }
}
