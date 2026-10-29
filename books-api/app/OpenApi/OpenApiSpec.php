<?php

namespace App\OpenApi;

use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *     title="Books API",
 *     version="1.0.0",
 *     description="API for managing books, authors and user authentication"
 * )
 *
 * @OA\Server(
 *     url="http://127.0.0.1:8000/api",
 *     description="Local development server"
 * )
 *
 * @OA\SecurityScheme(
 *     securityScheme="sanctum",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="API Token",
 *     description="Enter your Sanctum bearer token"
 * )
 *
 * @OA\Schema(
 *     schema="Book",
 *     type="object",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="title", type="string", example="Clean Code"),
 *     @OA\Property(property="year", type="integer", example=2024),
 *     @OA\Property(property="author_id", type="integer", example=1),
 *     @OA\Property(property="image", type="string", nullable=true, example="books/clean-code.jpg")
 * )
 *
 * @OA\Schema(
 *     schema="Author",
 *     type="object",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Robert Martin")
 * )
 *
 * @OA\Schema(
 *     schema="User",
 *     type="object",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Ghazi"),
 *     @OA\Property(property="email", type="string", format="email", example="ghazi@example.com")
 * )
 *
 * @OA\Schema(
 *     schema="LoginResponse",
 *     type="object",
 *     @OA\Property(property="message", type="string", example="Login successful"),
 *     @OA\Property(
 *         property="user",
 *         ref="#/components/schemas/User"
 *     ),
 *     @OA\Property(
 *         property="token",
 *         type="string",
 *         example="1|example-token"
 *     )
 * )
 *
 * @OA\Schema(
 *     schema="MessageResponse",
 *     type="object",
 *     @OA\Property(property="message", type="string", example="Operation successful")
 * )
 */
class OpenApiSpec
{
}