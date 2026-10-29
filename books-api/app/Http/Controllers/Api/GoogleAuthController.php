<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')
            ->with([
                'prompt' => 'select_account',
            ])
            ->redirect();
    }

    public function callback()
    {
        $googleUser = Socialite::driver('google')->user();

        $user = User::where('google_id', $googleUser->getId())
            ->first();

        if (! $user) {
            $user = User::where('email', $googleUser->getEmail())
                ->first();
        }

        if ($user) {
            if (
                $user->google_id &&
                $user->google_id !== $googleUser->getId()
            ) {
                return redirect()->away(
                    'http://localhost:4200/login?error=google_account_conflict'
                );
            }

            $user->forceFill([
                'google_id' => $googleUser->getId(),
                'email_verified_at' => $user->email_verified_at ?? now(),
            ])->save();
        } else {
            $user = User::create([
                'name' => $googleUser->getName() ?? 'Google User',
                'email' => $googleUser->getEmail(),
                'google_id' => $googleUser->getId(),
                'password' => Hash::make(Str::random(40)),
                'email_verified_at' => now(),
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return redirect()->away(
            'http://localhost:4200/auth/callback?token='.urlencode($token)
        );
    }
}
