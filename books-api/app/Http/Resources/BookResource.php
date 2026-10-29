<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'year' => $this->year,

            'image' => $this->image
                ? url('storage/' . ltrim(str_replace('storage/', '', $this->image), '/'))
                : null,

            'author' => $this->whenLoaded('author', function () {
                return [
                    'id' => $this->author->id,
                    'name' => $this->author->name,
                ];
            }),

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
