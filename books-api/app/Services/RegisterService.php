<?php

namespace App\Services;

use App\Exceptions\RegisterException;
use App\Mail\VerifyEmailOtpMail;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Throwable;

class RegisterService
{
    public function register(array $data): User
    {
        if (User::where('email', $data['email'])->exists()) {
            throw RegisterException::emailAlreadyExists();
        }

        $otp = (string) random_int(100000, 999999);

        try {
            $user = DB::transaction(function () use ($data, $otp) {
                return User::create([
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'password' => Hash::make($data['password']),
                    'email_otp_hash' => Hash::make($otp),
                    'email_otp_expires_at' => now()->addMinutes(10),
                ]);
            });

            Mail::to($user->email)->send(
                new VerifyEmailOtpMail($otp)
            );

            return $user;
        } catch (RegisterException $e) {
            throw $e;
        } catch (Throwable $e) {
            report($e);

            throw RegisterException::registrationFailed();
        }
    }

    public function verifyEmail(array $data): void
    {
        $user = User::where('email', $data['email'])->first();

        if (! $user) {
            throw RegisterException::emailNotFound();
        }

        if ($user->email_verified_at !== null) {
            throw RegisterException::emailAlreadyVerified();
        }

        if (
            ! $user->email_otp_hash ||
            ! $user->email_otp_expires_at ||
            now()->greaterThanOrEqualTo($user->email_otp_expires_at) ||
            ! Hash::check($data['otp'], $user->email_otp_hash)
        ) {
            throw RegisterException::invalidOrExpiredOtp();
        }

        $user->forceFill([
            'email_verified_at' => now(),
            'email_otp_hash' => null,
            'email_otp_expires_at' => null,
        ])->save();
    }
}
