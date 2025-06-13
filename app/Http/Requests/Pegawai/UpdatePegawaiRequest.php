<?php

namespace App\Http\Requests\Pegawai;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdatePegawaiRequest extends FormRequest
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
            'nama'  => 'required|string|max:255',
            'alamat'    => 'required',
            'telpon'    => 'required',
            'email'     => 'required|email|string|max:255',
            'gaji'      => 'required',
            'status'    => 'required|in:active,inactive',
            'tanggal_masuk' => 'required',
        ];
    }
}
