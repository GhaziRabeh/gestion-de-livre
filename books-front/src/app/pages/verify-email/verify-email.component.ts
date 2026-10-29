import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent {
  verifyEmailForm;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.verifyEmailForm = this.fb.group({
      email: [
        this.route.snapshot.queryParamMap.get('email') ?? '',
        [Validators.required, Validators.email],
      ],
      otp: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
    });
  }

  onSubmit(): void {
    if (this.verifyEmailForm.invalid || this.loading) {
      this.verifyEmailForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const data = this.verifyEmailForm.getRawValue();

    this.authService
      .verifyEmailOtp({
        email: data.email ?? '',
        otp: data.otp ?? '',
      })
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = response.message;

          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage =
            error.error?.errors?.otp?.[0] ??
            error.error?.errors?.email?.[0] ??
            error.error?.message ??
            'Une erreur est survenue lors de la vérification.';
          console.error('OTP error:', error.error);
        },
      });
  }
}
