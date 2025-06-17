<?php

namespace App\Http\Requests\Asset;

use Illuminate\Foundation\Http\FormRequest;

class StoreAssetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'asset_name' => 'required|string|max:255',
            'purchase_date' => 'required|date',
            'purchase_price' => 'required|numeric|min:0',
            'depreciation_method' => 'required|string',
            'usefull_live_years' => 'nullable|integer|min:0',
            'salvage_value' => 'nullable|numeric|min:0',
            'accumulated_depreciation' => 'nullable|numeric|min:0', // Corrected name
            'current_book_value' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'status' => 'required|string|in:Aktif,Dijual,Rusak,Dibuang',
            'last_depreciation_date' => 'nullable|date',

            // *** CRITICAL FIX FOR id_outlet (UUID) ***
            'id_outlet' => 'required|string|uuid|exists:outlets,id', // Changed 'integer' to 'string' and added 'uuid' rule
        ];
    }
}
