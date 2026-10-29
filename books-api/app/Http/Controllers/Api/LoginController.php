<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Services\LoginService;

class LoginController extends Controller
{
    public function __construct(
        private LoginService $loginService
    ) {}

    public function login(LoginRequest $request)
    {
        $user = $this->loginService->login(
            $request->validated()
        );

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful.',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'token' => $token,
        ]);
    }
}
