<?php

namespace App\OpenApi;

use OpenApi\Annotations as OA;

class AuthorDocs
{
    /**
     * @OA\Get(
     *     path="/authors",
     *     tags={"Authors"},
     *     summary="Get all authors",
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of authors",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Author")
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function index() {}

    /**
     * @OA\Get(
     *     path="/authors/{author}",
     *     tags={"Authors"},
     *     summary="Get author by ID",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="author",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer"),
     *         example=1
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Author details",
     *         @OA\JsonContent(ref="#/components/schemas/Author")
     *     ),
     *     @OA\Response(response=401, description="Unauthenticated"),
     *     @OA\Response(response=404, description="Author not found")
     * )
     */
    public function show() {}

    /**
     * @OA\Post(
     *     path="/authors",
     *     tags={"Authors"},
     *     summary="Create an author",
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Robert Martin")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Author created",
     *         @OA\JsonContent(ref="#/components/schemas/Author")
     *     ),
     *     @OA\Response(response=401, description="Unauthenticated"),
     *     @OA\Response(response=403, description="Forbidden"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function store() {}

    /**
     * @OA\Put(
     *     path="/authors/{author}",
     *     tags={"Authors"},
     *     summary="Update an author",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="author",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer"),
     *         example=1
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Robert C. Martin")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Author updated",
     *         @OA\JsonContent(ref="#/components/schemas/Author")
     *     ),
     *     @OA\Response(response=401, description="Unauthenticated"),
     *     @OA\Response(response=403, description="Forbidden"),
     *     @OA\Response(response=404, description="Author not found"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function update() {}

    /**
     * @OA\Delete(
     *     path="/authors/{author}",
     *     tags={"Authors"},
     *     summary="Delete an author",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="author",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer"),
     *         example=1
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Author deleted",
     *         @OA\JsonContent(ref="#/components/schemas/MessageResponse")
     *     ),
     *     @OA\Response(response=401, description="Unauthenticated"),
     *     @OA\Response(response=403, description="Forbidden"),
     *     @OA\Response(response=404, description="Author not found")
     * )
     */
    public function destroy() {}
}