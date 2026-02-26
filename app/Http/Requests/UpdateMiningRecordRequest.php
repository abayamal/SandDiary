<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMiningRecordRequest extends FormRequest
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
            'date'=>'required|date',
            'records'=>'required|array|min:1',
            'records.*.workerId'=>'required|exists:workers,id',
            'records.*.volume'=>'required|numeric|min:0.75',
            'records.*.numberOfLoads'=>'required|integer|min:1'
        ];
    }

    public function messages(): array
    {
        return [
            'records.*.workerId.required'=>'Please select a worker',
            'records.*.volume.required'=>'Please select a volume',
            'records.*.numberOfLoads.required'=>'Please select Number of Loads',
            'records.*.numberOfLoads.integer'=>'Number of loads must be an numeric.',
            'records.*.volume.min'=>'Volume field must be at least 0.75',
            'records.*.numberOfLoads.min'=>'Number of loads field must be at least 1',
        ];
    }
}
