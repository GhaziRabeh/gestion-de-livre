<?php

namespace App\Exceptions;

use Exception;

class LogoutException extends Exception
{
    public static function logoutFailed(): self
    {
        return new self('Failed to logout.');
    }
}
