<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Services\ForgotPasswordService;

class ForgotPasswordController extends Controller
{
    public function __construct(
        private ForgotPasswordService $forgotPasswordService
    ) {}

    public function sendOtp(ForgotPasswordRequest $request)
    {
        $this->forgotPasswordService->sendOtp(
            $request->validated()
        );

        return response()->json([
            'message' => 'Password reset code sent successfully.',
        ]);
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $this->forgotPasswordService->resetPassword(
            $request->validated()
        );

        return response()->json([
            'message' => 'Password reset successfully.',
        ]);
    }
}
