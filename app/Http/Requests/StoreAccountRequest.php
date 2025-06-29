<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAccountRequest extends FormRequest
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
            'account_name' => 'required',
            'account_type' => 'required|in:Assets,Liability,Equity,Revenue,Expense',
            'initial_balance' => 'required',
            'current_balance' => 'required',
            'description' => ''
        ];
    }
}
