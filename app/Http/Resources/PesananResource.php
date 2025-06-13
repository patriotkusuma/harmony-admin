<?php

namespace App\Http\Resources;

use App\Models\Pesanan;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PesananResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [

            'kode_pesan' => $this->kode_pesan,
            'total_harga' => $this->total_harga,
            'status'    => $this->status,
            'tanggal_pesan' => $this->tanggal_pesan,
            'tanggal_ambil' => $this->tanggal_ambil,
            'tanggal_selesai' => $this->tanggal_selesai,
            'keterangan' => $this->keterangan,
            'status_pembayaran' => $this->status_pembayaran,
            'antar' => $this->antar,
            'detail_pesanan' => DetailPesananResource::collection($this->whenLoaded('detailPesanan')),
            'customer' => new CustomerResource($this->whenLoaded('customer')),
            'detail_pakaian' => new DetailPakaianResource($this->whenLoaded('detailPakaian')),
            'bukti_pakaians' => new BuktiPakaianResource($this->whenLoaded('buktiPakaians')),
            'paid'=> $this->paid,
            'notify_pesan' => $this->notify_pesan,
            'notify_selesai' => $this->notify_selesai,
            'notify_pesan_error' => $this->notify_pesan_error,
            'notify_selesai_error' => $this->notify_selesai_error,
            'transaction_id' => $this->transaction_id,
        ];



        // return parent::toArray($request);
    }

}
