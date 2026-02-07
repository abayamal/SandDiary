<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SandMovement extends Model
{
    public const TYPE_IN = 'IN';
    public const TYPE_OUT = 'OUT';

    public function reference(){
        return $this->morphTo();
    }
}
