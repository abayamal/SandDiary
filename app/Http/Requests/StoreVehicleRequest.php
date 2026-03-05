<?php

namespace App\Http\Requests;

use App\Models\Vehicle;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreVehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'number'=>strtoupper($this->number),
        ]);
    }   

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'number'=> [
                'required',
                'string',
                'max:20',
                'unique:vehicles,number',
                'regex:/^[A-Z0-9\- ]+$/'
            ],
            'type'=>[
                'required',
                'string',
                Rule::in(Vehicle::TYPES)
            ],
            'owner'=>'string',
            'volume'=>[
                'required',
                'numeric',
                Rule::in(Vehicle::VOLUMES)
            ]
            
        ];
    }

 
}
