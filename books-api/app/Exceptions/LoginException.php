<?php

namespace App\Exceptions;

use Exception;

class LoginException extends Exception
{
    public static function invalidCredentials(): self
    {
        return new self('Invalid email or password.');
    }

    public static function emailNotVerified(): self
    {
        return new self('Email address is not verified.');
    }

    public static function loginFailed(): self
    {
        return new self('Failed to login.');
    }
}
