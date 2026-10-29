<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookRequest extends FormRequest
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
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'year' => ['sometimes', 'required', 'integer', 'min:1000', 'max:9999'],
            'author_id' => ['sometimes', 'required', 'integer', 'exists:authors,id'],
            'image' => ['sometimes', 'nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    
    }
}
