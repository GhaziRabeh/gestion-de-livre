<?php

namespace App\Exceptions;

use Exception;

class ForgotPasswordException extends Exception
{
    public static function emailNotFound(): self
    {
        return new self('Email address not found.');
    }

    public static function otpSendingFailed(): self
    {
        return new self('Failed to send password reset code.');
    }

    public static function invalidOrExpiredOtp(): self
    {
        return new self('Invalid or expired password reset code.');
    }

    public static function passwordResetFailed(): self
    {
        return new self('Failed to reset password.');
    }
}
