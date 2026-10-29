<?php

namespace App\Exceptions;

use Exception;

class RegisterException extends Exception
{
    public static function emailAlreadyExists(): self
    {
        return new self('Email address already exists.');
    }

    public static function registrationFailed(): self
    {
        return new self('Failed to register account.');
    }

    public static function emailNotFound(): self
    {
        return new self('Email address not found.');
    }

    public static function emailAlreadyVerified(): self
    {
        return new self('Email is already verified.');
    }

    public static function invalidOrExpiredOtp(): self
    {
        return new self('Invalid or expired OTP.');
    }

    public static function otpSendingFailed(): self
    {
        return new self('Failed to send verification code.');
    }
}
