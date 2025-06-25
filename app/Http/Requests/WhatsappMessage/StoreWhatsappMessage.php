<?php

namespace App\Http\Requests\WhatsappMessage;

use Illuminate\Foundation\Http\FormRequest;

class StoreWhatsappMessage extends FormRequest
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
            'message_id' => 'required|string',
            'from' => 'required|string',
            'to' => 'required|string',
            'message_type' => 'required|string|in:text,image,video,audio,document,location,contact,other',
            'message_content' => 'nullable|string',
            'media_url' => 'nullable|string',
            'from_customer' => 'nullable|boolean',
            'is_group' => 'nullable|boolean',
            'timestamp' => 'nullable|date',
        ];
    }

    public function messages(): array 
    {
        return [
            'message_id.required' => 'Message ID wajib diisi. ',
            'from.required' => 'Nomor pengirim wajib diisi',
            'to.required' => 'Nomor penerima wajib diisi',
            'message_type.required' => 'Tipe pesan wajib diisi'
        ];
    }
}
