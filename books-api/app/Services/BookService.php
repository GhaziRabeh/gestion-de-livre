<?php

namespace App\Services;

use App\Exceptions\BookException;
use App\Models\Book;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Throwable;

class BookService
{
    public function getBooks(array $filters = []): LengthAwarePaginator
    {
        $query = Book::with('author');

        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where('title', 'LIKE', "%{$search}%");
        }

        if (! empty($filters['author'])) {
            $author = $filters['author'];

            $query->whereHas('author', function ($q) use ($author) {
                $q->where('name', 'LIKE', "%{$author}%");
            });
        }

        return $query->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();
    }

    public function createBook(array $data): Book
    {
        try {
            if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
                $data['image'] = $data['image']->store('books', 'public');
            }

            return Book::create($data)->load('author');
        } catch (Throwable $e) {
            throw BookException::creationFailed();
        }
    }

    public function getBook(Book $book): Book
    {
        return $book->load('author');
    }

    public function updateBook(Book $book, array $data): Book
    {
        try {
            if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
                if ($book->image) {
                    Storage::disk('public')->delete($book->image);
                }

                $data['image'] = $data['image']->store('books', 'public');
            }

            $book->update($data);

            return $book->fresh()->load('author');
        } catch (Throwable $e) {
            throw BookException::updateFailed();
        }
    }

    public function deleteBook(Book $book): void
    {
        try {
            $image = $book->image;

            $book->delete();

            if ($image) {
                Storage::disk('public')->delete($image);
            }
        } catch (Throwable $e) {
            throw BookException::deletionFailed();
        }
    }
}
