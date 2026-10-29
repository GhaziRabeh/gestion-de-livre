<?php

namespace App\Exceptions;

use Exception;

class BookException extends Exception
{
    public static function bookNotFound(): self
    {
        return new self('Book not found.');
    }

    public static function creationFailed(): self
    {
        return new self('Failed to create book.');
    }

    public static function updateFailed(): self
    {
        return new self('Failed to update book.');
    }

    public static function deletionFailed(): self
    {
        return new self('Failed to delete book.');
    }
}
