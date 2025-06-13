<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryPaketResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'nama'  =>$this->nama,
            'durasi' => $this->durasi,
            'tipe_durasi' => $this->tipe_durasi,
            'deskripsi' => $this->deskripsi,
            'paket_cuci' => JenisCuciResource::collection($this->whenLoaded('paketCuci'))
        ];
    }
}
