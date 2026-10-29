<?php

namespace App\OpenApi;

use OpenApi\Annotations as OA;

class AuthDocs
{
    /**
     * @OA\Post(
     *     path="/register",
     *     tags={"Authentication"},
     *     summary="Register a new user",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","email","password","password_confirmation"},
     *             @OA\Property(property="name", type="string", example="Ghazi"),
     *             @OA\Property(property="email", type="string", format="email", example="ghazi@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="Password123"),
     *             @OA\Property(property="password_confirmation", type="string", format="password", example="Password123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Account created; check email for OTP",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Account created. Check your email for the OTP."),
     *             @OA\Property(
     *                 property="user",
     *                 ref="#/components/schemas/User"
     *             )
     *         )
     *     ),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function register() {}

    /**
     * @OA\Post(
     *     path="/verify-email",
     *     tags={"Authentication"},
     *     summary="Verify email using OTP",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","otp"},
     *             @OA\Property(property="email", type="string", format="email", example="ghazi@example.com"),
     *             @OA\Property(property="otp", type="string", example="123456")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Email verified successfully",
     *         @OA\JsonContent(ref="#/components/schemas/MessageResponse")
     *     ),
     *     @OA\Response(response=422, description="Invalid OTP or validation error")
     * )
     */
    public function verifyEmail() {}

    /**
     * @OA\Post(
     *     path="/login",
     *     tags={"Authentication"},
     *     summary="Login",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", format="email", example="ghazi@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="Password123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login successful",
     *         @OA\JsonContent(ref="#/components/schemas/LoginResponse")
     *     ),
     *     @OA\Response(response=401, description="Invalid credentials"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function login() {}

    /**
     * @OA\Post(
     *     path="/logout",
     *     tags={"Authentication"},
     *     summary="Logout",
     *     description="Requires a valid Sanctum bearer token",
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Logout successful",
     *         @OA\JsonContent(ref="#/components/schemas/MessageResponse")
     *     ),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function logout() {}

    /**
     * @OA\Post(
     *     path="/forgot-password",
     *     tags={"Authentication"},
     *     summary="Send password reset OTP",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email"},
     *             @OA\Property(property="email", type="string", format="email", example="ghazi@example.com")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Password reset code sent",
     *         @OA\JsonContent(ref="#/components/schemas/MessageResponse")
     *     ),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function forgotPassword() {}

    /**
     * @OA\Post(
     *     path="/reset-password",
     *     tags={"Authentication"},
     *     summary="Reset password using OTP",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","otp","password","password_confirmation"},
     *             @OA\Property(property="email", type="string", format="email", example="ghazi@example.com"),
     *             @OA\Property(property="otp", type="string", example="123456"),
     *             @OA\Property(property="password", type="string", format="password", example="NewPassword123"),
     *             @OA\Property(property="password_confirmation", type="string", format="password", example="NewPassword123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Password reset successfully",
     *         @OA\JsonContent(ref="#/components/schemas/MessageResponse")
     *     ),
     *     @OA\Response(response=422, description="Invalid OTP or validation error")
     * )
     */
    public function resetPassword() {}
}