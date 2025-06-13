<?php

namespace App\Http\Resources;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
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
            'total_pembayaran' => $this->total_pembayaran,
            'kembalian' => $this->kembalian,
            'nominal_bayar' => $this->nominal_bayar,
            'tipe' => $this->tipe,
            'tanggal_bayar' => $this->created_at,
            'customer' => new CustomerResource($this->whenLoaded('customer')),

        ];
    }
}
