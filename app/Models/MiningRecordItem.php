<?php

namespace App\Models;

use App\Models\Worker;
use App\Models\MiningRecord;
use Illuminate\Database\Eloquent\Model;

class MiningRecordItem extends Model
{
    protected $fillable = ['mining_record_id','worker_id','volume','number_of_loads'];
    
    public function miningRecord(){
        return $this->belongsTo(MiningRecord::class);
    }

    public function worker(){
        return $this->belongsTo(Worker::class);
    }
}
