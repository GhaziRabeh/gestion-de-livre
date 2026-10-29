<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\BookException;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Http\Resources\BookResource;
use App\Models\Book;
use App\Services\BookService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class BookController extends Controller
{
    public function __construct(
        private BookService $bookService
    ) {}

    /**
     * Display a listing of the resource.
     * Public: anyone can view the list of books.
     */
    public function index(Request $request)
    {
        $books = $this->bookService->getBooks(
            $request->only(['search', 'author'])
        );

        return BookResource::collection($books);
    }

    /**
     * Store a newly created resource in storage.
     * Admin only.
     */
    public function store(StoreBookRequest $request)
    {
        Gate::authorize('create', Book::class);

        try {
            $book = $this->bookService->createBook(
                $request->validated()
            );

            return (new BookResource($book))
                ->response()
                ->setStatusCode(201);

        } catch (BookException $e) {
            Log::error('Book creation failed.', [
                'exception' => $e,
            ]);

            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     * Authentication required by the route middleware.
     */
    public function show(Book $book)
    {
        return new BookResource(
            $this->bookService->getBook($book)
        );
    }

    /**
     * Update the specified resource in storage.
     * Admin only.
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        Gate::authorize('update', $book);

        try {
            $updatedBook = $this->bookService->updateBook(
                $book,
                $request->validated()
            );

            return new BookResource($updatedBook);

        } catch (BookException $e) {
            Log::error('Book update failed.', [
                'exception' => $e,
            ]);

            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     * Admin only.
     */
    public function destroy(Book $book)
    {
        Gate::authorize('delete', $book);

        try {
            $this->bookService->deleteBook($book);

            return response()->json([
                'message' => 'Book deleted successfully.',
            ]);

        } catch (BookException $e) {
            Log::error('Book deletion failed.', [
                'exception' => $e,
            ]);

            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
