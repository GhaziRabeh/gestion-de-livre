<?php

namespace App\Services;

use App\Exceptions\AuthorException;
use App\Models\Author;
use Illuminate\Database\Eloquent\Collection;
use Throwable;

class AuthorService
{
    public function getAuthors(): Collection
    {
        return Author::query()
            ->orderByDesc('id')
            ->get();
    }

    public function createAuthor(array $data): Author
    {
        try {
            return Author::create($data);
        } catch (Throwable $e) {
            throw AuthorException::creationFailed();
        }
    }

    public function getAuthor(Author $author): Author
    {
        return $author;
    }

    public function updateAuthor(Author $author, array $data): Author
    {
        try {
            $author->update($data);

            return $author->refresh();
        } catch (Throwable $e) {
            throw AuthorException::updateFailed();
        }
    }

    public function deleteAuthor(Author $author): void
    {
        try {
            $author->delete();
        } catch (Throwable $e) {
            throw AuthorException::deletionFailed();
        }
    }
}