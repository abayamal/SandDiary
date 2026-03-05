<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    public const TYPES = ['Tractor','Lorry'];
    public const VOLUMES = [0.75,1];

    protected $fillable = ['number','type','owner','volume'];
}
