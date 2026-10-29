<?php

namespace App\Services;

use App\Exceptions\LogoutException;
use Illuminate\Http\Request;

class LogoutService
{
    public function logout(Request $request): void
    {
        try {
            $request->user()->currentAccessToken()->delete();
        } catch (\Throwable $e) {
            throw LogoutException::logoutFailed();
        }
    }
}