<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DetailPesananResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            // 'id_pesanan' => $this->id_pesanan,
            'harga' => $this->harga,
            'qty' => $this->qty,
            'total_harga' => $this->total_harga,
            'keterangan' => $this->keterangan,
            'tanggal_selesai' => $this->tanggal_selesai,
            'jenis_cuci' =>  new JenisCuciResource($this->whenLoaded('jenisCuci')),
        ];
    }
}
