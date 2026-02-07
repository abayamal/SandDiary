<?php

namespace App\Models;

use App\Models\MiningRecordItem;
use Illuminate\Database\Eloquent\Model;

class MiningRecord extends Model
{

    protected $fillable = ['date'];
    
    public function items(){
        return $this->hasMany(MiningRecordItem::class);
    }

    public function sandMovements(){
        return $this->morphMany(SandMovement::class,'reference');
    }
}
