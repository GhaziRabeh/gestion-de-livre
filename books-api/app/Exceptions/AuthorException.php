<?php

namespace App\Exceptions;

use Exception;

class AuthorException extends Exception
{
    public static function creationFailed(): self
    {
        return new self('Failed to create author.');
    }

    public static function updateFailed(): self
    {
        return new self('Failed to update author.');
    }

    public static function deletionFailed(): self
    {
        return new self('Failed to delete author.');
    }
}