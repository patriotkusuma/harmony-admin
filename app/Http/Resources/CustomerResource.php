<?php

namespace App\Http\Resources;

use App\Models\Pesanan;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama' => $this->nama,
            'alamat' => $this->alamat,
            'telpon' => $this->telpon,
            'totalBayar' => $this->pesananPayable->sum('total_harga'),
            'telahBayar' => $this->pesananPayable->sum('paid'),
            'keterangan' => $this->keterangan,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'pesanan' => PesananResource::collection($this->whenLoaded('pesanan')),
            'pesanan_payable' => PesananResource::collection($this->whenLoaded('pesananPayable')),
            'pesanan_takable' => PesananResource::collection($this->whenLoaded('pesananTakeable'))
        ];
    }
}
