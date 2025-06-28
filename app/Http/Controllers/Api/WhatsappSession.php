<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\WhatsappSession\StoreWhatsappSession;
use Illuminate\Http\Request;

class WhatsappSession extends Controller
{
    public function storeSession(StoreWhatsappSession $request)
    {
        $data = $request->validated();

        $session = WhatsappSession::create([
            'session_name' => $data['session_name'],
            'client_id' => $data['client_id'] ?? null,
            'no_wa' => $data['no_wa'],
            'id_outlet' => $data['id_outlet'] ?? null,
            'is_active' => $data['is_active'] ?? true,
        ]);
    }
}
