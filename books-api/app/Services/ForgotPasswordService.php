<?php

namespace App\Services;

use App\Exceptions\ForgotPasswordException;
use App\Mail\PasswordResetOtpMail;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ForgotPasswordService
{
    public function sendOtp(array $data): void
    {
        $user = User::where('email', $data['email'])->first();

        if (! $user) {
            throw ForgotPasswordException::emailNotFound();
        }

        $otp = (string) random_int(100000, 999999);

        try {
            DB::transaction(function () use ($user, $otp) {
                $user->forceFill([
                    'password_reset_otp_hash' => Hash::make($otp),
                    'password_reset_otp_expires_at' => now()->addMinutes(10),
                ])->save();
            });

            Mail::to($user->email)->send(
                new PasswordResetOtpMail($otp)
            );
        } catch (Throwable $e) {
            report($e);

            throw ForgotPasswordException::otpSendingFailed();
        }
    }

    public function resetPassword(array $data): void
    {
        try {
            $user = User::where('email', $data['email'])->first();

            if (
                ! $user ||
                ! $user->password_reset_otp_hash ||
                ! $user->password_reset_otp_expires_at ||
                now()->greaterThanOrEqualTo($user->password_reset_otp_expires_at) ||
                ! Hash::check($data['otp'], $user->password_reset_otp_hash)
            ) {
                throw ForgotPasswordException::invalidOrExpiredOtp();
            }

            $user->forceFill([
                'password' => Hash::make($data['password']),
                'password_reset_otp_hash' => null,
                'password_reset_otp_expires_at' => null,
            ])->save();
        } catch (ForgotPasswordException $e) {
            throw $e;
        } catch (Throwable $e) {
            report($e);

            throw ForgotPasswordException::passwordResetFailed();
        }
    }
}
