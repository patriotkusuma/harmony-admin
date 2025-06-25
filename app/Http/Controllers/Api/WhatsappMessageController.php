<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\WhatsappMessage\StoreWhatsappMessage;
use App\Models\Customer;
use App\Models\Outlet;
use App\Models\WhatsappMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WhatsappMessageController extends Controller
{
    protected $log;
    public function __construct()
    {
        $this->log = \Log::channel('whatsapp_message');
    }
    public function index(): void
    {

    }

    public function store(StoreWhatsappMessage $request): void
    {
        try{

            $data = $request->validated();

            $this->log->info('Data Request berhasil di validasi');
            
            $senderNo = preg_replace('/[^0-9]/', '', $data['from']);
            $receiverNo = preg_replace('/[^0-9]/', '', $data['to']);

            $customer = Customer::where('telpon', $senderNo)->first();
            $outlet = Outlet::where('telpon', $receiverNo)->first();


            $message = WhatsappMessage::create([
                'message_id' => $data['message_id'],
                'sender_no' => $senderNo,
                'receiver_no' => $receiverNo,
                'from_customer' => $data['from_customer'] ?? true,
                'is_group' => $data['is_group'] ?? false,
                'message_type' => $data['message_type'],
                'message_content' => $data['message_content'] ?? null,
                'media_url' => $data['media_url'] ?? null,
                'timestamp' => $data['timestamp'] ?? now(),
                'status' => 'received',
                'uuid_customer' => $customer->uuid_customer ?? null,
                'id_outlet' => $outlet->id,
            ]);

            $this->log->info('Pesan Whatsapp berhasil disimpan di database');
            return response()->json([
                'success' => true,
                'message_id' => $message->id,
                'message' => 'Pesan sudah tersimpan di database'
            ], 200);
        }catch(\Exception $ex)
        {
            $this->log->error('pesan gagal disimpan di database' . $ex->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'pesan gagal disimpan di database',

            ], 500);
        }

    }

    public function show(WhatsappMessage $whatsappMessage): void    
    {
        
    }

    public function update(StoreWhatsappMessage $request, WhatsappMessage $whatsappMessage): void
    {

    }

    public function destroy(WhatsappMessage $whatsappMessage): void 
    {

    }
}
