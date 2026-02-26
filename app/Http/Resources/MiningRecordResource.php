<?php

namespace App\Http\Resources;

use App\Http\Resources\MiningRecordItemResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MiningRecordResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'date'=>$this->date,
            'records'=>MiningRecordItemResource::collection(
                $this->whenLoaded('items')
            )
        ];
    }
}
