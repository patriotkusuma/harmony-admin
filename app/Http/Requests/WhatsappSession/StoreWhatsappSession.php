<?php

namespace App\Http\Requests\WhatsappSession;

use Illuminate\Foundation\Http\FormRequest;

class StoreWhatsappSession extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'session_name' => 'required|string',
            'client_id' => 'required|string',
            'no_wa' => 'required|string',
            'id_outlet' => 'required|string',
            'is_active' => 'required|boolean',
        ];
    }
}
