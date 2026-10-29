<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VerifyEmailOtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $otp
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your email verification code',
        );
    }

    public function content(): Content
    {
        return new Content(
            htmlString: '
                <h2>Email Verification</h2>
                <p>Your verification code is:</p>
                <h1>' . e($this->otp) . '</h1>
                <p>This code expires in 10 minutes.</p>
            ',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
