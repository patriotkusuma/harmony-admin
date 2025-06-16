<?php

namespace App\Http\Requests\Asset;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAssetRequest extends FormRequest
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
           'asset_name' => 'required',
           'purchase_date' => 'required|date',
           'purchase_price' => 'required',
           'depreciation_method' => 'required',
           'usefull_live_years' => 'numeric',
           'salvage_value' => 'numeric',
           'accumulative_depreciation' => 'numeric',
           'current_book_value' => 'numeric',
           'description' => '',
           'status' => 'required|in:Aktif, Dijual, Rusak, Dibuang',
           'last_depreciation_date' => '',
           'depreciation_method' => 'string',
           'id_outlet' => 'required',
        ];
    }
}
