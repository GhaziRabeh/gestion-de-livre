<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use App\Http\Resources\AuthorResource;
use App\Models\Author;
use App\Services\AuthorService;
use Illuminate\Support\Facades\Gate;

class AuthorController extends Controller
{
    public function __construct(
        private AuthorService $authorService
    ) {}

    /**
     * Display a listing of the authors.
     */
    public function index()
    {
         return AuthorResource::collection(
        $this->authorService->getAuthors()
    );
    }

    /**
     * Store a newly created author.
     */
    public function store(StoreAuthorRequest $request)
    {
        Gate::authorize('create', Author::class);

        $author = $this->authorService->createAuthor(
            $request->validated()
        );

        return (new AuthorResource($author))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified author.
     */
    public function show(Author $author)
    {
        return new AuthorResource(
            $this->authorService->getAuthor($author)
        );
    }

    /**
     * Update the specified author.
     */
    public function update(
        UpdateAuthorRequest $request,
        Author $author
    ) {
        Gate::authorize('update', $author);

        $updatedAuthor = $this->authorService->updateAuthor(
            $author,
            $request->validated()
        );

        return new AuthorResource($updatedAuthor);
    }

    /**
     * Remove the specified author.
     */
    public function destroy(Author $author)
    {
        Gate::authorize('delete', $author);

        $this->authorService->deleteAuthor($author);

        return response()->json([
            'message' => 'Author deleted successfully.',
        ]);
    }
}