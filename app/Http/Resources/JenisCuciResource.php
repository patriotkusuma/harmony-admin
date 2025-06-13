<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JenisCuciResource extends JsonResource
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
            'harga' => $this->harga,
            'gambar' => $this->gambar,
            'tipe' => $this->tipe,
            'keterangan' => $this->keterangan,
            'category_paket' => new CategoryPaketResource($this->whenLoaded('categoryPaket'))
        ];
    }
}
