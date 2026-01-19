<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWorkerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'=>'required|string|regex:/^[a-zA-Z\s]+$/',
            'nic'=>'required|unique:workers,nic|regex:/^[0-9]{9}[vVxX]$/',
            'phone'=>'required|numeric|digits:10',
            'rateForCube'=>'required|numeric',
            'rateForTractorLoad'=>'required|numeric',
        ];
    }
}
