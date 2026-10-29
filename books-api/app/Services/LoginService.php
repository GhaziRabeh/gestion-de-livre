<?php

namespace App\Services;

use App\Exceptions\LoginException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Throwable;

class LoginService
{
    public function login(array $data): User
    {
        try {
            $user = User::where('email', $data['email'])->first();

            if (!$user || !Hash::check($data['password'], $user->password)) {
                throw LoginException::invalidCredentials();
            }

            if ($user->email_verified_at === null) {
                throw LoginException::emailNotVerified();
            }

            return $user;
        } catch (LoginException $e) {
            throw $e;
        } catch (Throwable $e) {
            report($e);

            throw LoginException::loginFailed();
        }
    }
}
