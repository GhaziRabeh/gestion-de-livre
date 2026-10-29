import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  loading = false;
  errorMessage = '';
  successMessage = '';

  forgotPasswordForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid || this.loading) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const email = this.forgotPasswordForm.getRawValue().email ?? '';

    this.authService.forgotPassword({ email }).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = response.message;

        this.router.navigate(['/reset-password'], {
          queryParams: { email },
        });
      },

      error: (error) => {
        this.loading = false;
        this.errorMessage =
          error.error?.errors?.email?.[0] ??
          error.error?.message ??
          'Une erreur est survenue.';

        console.error('Forgot password error:', error.error);
      },
    });
  }
}
