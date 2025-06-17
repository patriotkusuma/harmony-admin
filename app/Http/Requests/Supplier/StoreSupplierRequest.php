<?php

namespace App\Http\Requests\Supplier;

use Illuminate\Foundation\Http\FormRequest;

class StoreSupplierRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth() ? true: false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:256',
            'contact_person' => 'nullable|string|max:256',
            'telpon' => 'nullable|string|max:256',
            'email' => 'nullable|email',
            'address' => 'string|string',
            'supplier_type'=> 'in:Online Marketplace,Toko Fisik Retail, Distributor, Lainnya',
            'description' => 'nullable|string',
        ];
    }
}
