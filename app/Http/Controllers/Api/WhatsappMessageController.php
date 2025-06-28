<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\WhatsappMessage\StoreWhatsappMessage;
use App\Models\Customer;
use App\Models\Outlet;
use App\Models\WhatsappMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class WhatsappMessageController extends Controller
{
    protected $log;
    public function __construct()
    {
        $this->log = \Log::channel('whatsapp_message');
    }
    public function index()
    {

    }

    public function store(StoreWhatsappMessage $request)
    {
        try{
            // Log the raw request and files *before* validation to aid debugging if validation fails
            $this->log->info('Incoming request raw data:', $request->all());
            $this->log->info('Incoming request files:', $request->allFiles());
            $this->log->info('Incoming request headers:', $request->headers->all());

            $data = $request->validated();

            $this->log->info('Data Request berhasil di validasi', $data);
            
            // $senderNo = preg_replace('/[^0-9]/', '', $data['from']);
            $senderNo = '0' . substr(str_replace('@c.us', '', $data['from']), 2);
            // $receiverNo = preg_replace('/[^0-9]/', '', $data['to']);
            $receiverNo = '0' . substr(str_replace('@c.us', '', $data['to']), 2);

            $customer = Customer::where('telpon', $senderNo)
            ->orWhere('telpon', $receiverNo)->first();
            $outlet = Outlet::where('telpon', $receiverNo)
                ->orWhere('telpon', $senderNo)->first(); 

           

            $mediaUrl = null;
            // Check if a file was uploaded and is valid
            if ($request->hasFile('media') && $request->file('media')->isValid()) {
                $file = $request->file('media');
                // Store the file and get its path
                // 'whatsapp_media' is the folder name inside your configured disk (e.g., 'public')
                $path = $file->store('whatsapp_media', 'public'); // 'public' is the disk name from config/filesystems.php
                $mediaUrl = Storage::url($path); // Get the publicly accessible URL
                $this->log->info('Media berhasil diupload', ['path' => $path, 'url' => $mediaUrl]);
            } else {
                $this->log->info('Tidak ada media atau media tidak valid untuk disimpan.');
            }

            $isGroup = filter_var($data['is_group'] ?? 'false', FILTER_VALIDATE_BOOLEAN);
            $fromCustomer = filter_var($data['from_customer'] ?? 'true', FILTER_VALIDATE_BOOLEAN);


            $message = WhatsappMessage::create([
                'message_id' => $data['message_id'],
                'sender_no' => $senderNo,
                'receiver_no' => $receiverNo,
                'from_customer' => $fromCustomer,
                'is_group' => $isGroup,
                'message_type' => $data['message_type'],
                'message_content' => $data['message_content'] ?? null,
                'media_url' => $mediaUrl ?? null,
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
            $this->log->error('Pesan gagal disimpan di database: ' . $ex->getMessage(), [
                'trace' => $ex->getTraceAsString(),
                'request_data' => $request->all(), // Log all request data for debugging
                'request_files' => $request->allFiles() // Log all files data
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Pesan gagal disimpan di database',
                'error' => $ex->getMessage(), // Include error message for client feedback
                'errors' => $ex instanceof \Illuminate\Validation\ValidationException ? $ex->errors() : null // For validation errors
            ], 500);
        }

    }

    public function show(WhatsappMessage $whatsappMessage)
    {
        
    }

    public function update(StoreWhatsappMessage $request, WhatsappMessage $whatsappMessage)
    {

    }

    public function destroy(WhatsappMessage $whatsappMessage)
    {

    }
}
