<?php

namespace App\OpenApi;

use OpenApi\Annotations as OA;

class BookDocs
{
    /**
     * @OA\Get(
     *     path="/books",
     *     tags={"Books"},
     *     summary="Get all books",
     *     @OA\Response(
     *         response=200,
     *         description="List of books",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Book")
     *         )
     *     )
     * )
     */
    public function index() {}

    /**
     * @OA\Get(
     *     path="/books/{book}",
     *     tags={"Books"},
     *     summary="Get a book by ID",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="book",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer"),
     *         example=1
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Book details",
     *         @OA\JsonContent(ref="#/components/schemas/Book")
     *     ),
     *     @OA\Response(response=401, description="Unauthenticated"),
     *     @OA\Response(response=404, description="Book not found")
     * )
     */
    public function show() {}

    /**
     * @OA\Post(
     *     path="/books",
     *     tags={"Books"},
     *     summary="Create a book",
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title","year","author_id"},
     *             @OA\Property(property="title", type="string", example="Clean Code"),
     *             @OA\Property(property="year", type="integer", example=2024),
     *             @OA\Property(property="author_id", type="integer", example=1),
     *             @OA\Property(property="image", type="string", nullable=true, example="books/clean-code.jpg")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Book created",
     *         @OA\JsonContent(ref="#/components/schemas/Book")
     *     ),
     *     @OA\Response(response=401, description="Unauthenticated"),
     *     @OA\Response(response=403, description="Forbidden"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function store() {}

    /**
     * @OA\Put(
     *     path="/books/{book}",
     *     tags={"Books"},
     *     summary="Update a book",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="book",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer"),
     *         example=1
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="title", type="string", example="Clean Code Updated"),
     *             @OA\Property(property="year", type="integer", example=2025),
     *             @OA\Property(property="author_id", type="integer", example=1),
     *             @OA\Property(property="image", type="string", nullable=true, example="books/updated.jpg")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Book updated",
     *         @OA\JsonContent(ref="#/components/schemas/Book")
     *     ),
     *     @OA\Response(response=401, description="Unauthenticated"),
     *     @OA\Response(response=403, description="Forbidden"),
     *     @OA\Response(response=404, description="Book not found"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function update() {}

    /**
     * @OA\Delete(
     *     path="/books/{book}",
     *     tags={"Books"},
     *     summary="Delete a book",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="book",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer"),
     *         example=1
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Book deleted",
     *         @OA\JsonContent(ref="#/components/schemas/MessageResponse")
     *     ),
     *     @OA\Response(response=401, description="Unauthenticated"),
     *     @OA\Response(response=403, description="Forbidden"),
     *     @OA\Response(response=404, description="Book not found")
     * )
     */
    public function destroy() {}
}