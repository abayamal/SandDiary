<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DailyMiningResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $total_volume = $this->items->sum(function ($item){
                            return $item->volume * $item->number_of_loads;  
                        });

            return [
                'id' => $this->id,
                'date' => $this->date,
                'workers' => $this->items_count,
                'volume' => round($total_volume, 2),
            ];
    }
}
