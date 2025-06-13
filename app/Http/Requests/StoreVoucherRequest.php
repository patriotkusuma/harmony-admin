<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVoucherRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'nama' => 'required',
            'kode_voucher' => 'required',
            'jenis' => 'required|in:nominal,persen',
            'nilai' => 'required|numeric',
            'kuota' => 'required|numeric',
            'start_time' => 'required|date',
            'end_time' => 'required|date',
            'status' => 'required|in:active,inactive'
        ];
    }
}
