<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MiningRecordItemResource extends JsonResource
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
            'workerId'=>$this->worker_id,
            'volume'=>$this->volume,
            'numberOfLoads'=>$this->number_of_loads
        ];
    }
}
