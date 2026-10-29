<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\LogoutService;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function __construct(
        private LogoutService $logoutService
    ) {}

    public function logout(Request $request)
    {
        $this->logoutService->logout($request);

        return response()->json([
            'message' => 'Logout successful.',
        ]);
    }
}