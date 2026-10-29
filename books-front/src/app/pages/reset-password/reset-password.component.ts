import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  loading = false;
  errorMessage = '';
  successMessage = '';

  resetPasswordForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    const email = this.route.snapshot.queryParamMap.get('email') ?? '';
    const otp = this.route.snapshot.queryParamMap.get('otp') ?? '';

    this.resetPasswordForm = this.fb.group(
      {
        email: [email, [Validators.required, Validators.email]],
        otp: [otp, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_confirmation: ['', Validators.required],
      },
      {
        validators: (form: AbstractControl): ValidationErrors | null => {
          return form.get('password')?.value ===
            form.get('password_confirmation')?.value
            ? null
            : { passwordMismatch: true };
        },
      },
    );
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid || this.loading) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const data = this.resetPasswordForm.getRawValue();

    this.authService
      .resetPassword({
        email: data.email ?? '',
        otp: data.otp ?? '',
        password: data.password ?? '',
        password_confirmation: data.password_confirmation ?? '',
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
            error.error?.errors?.password?.[0] ??
            error.error?.message ??
            'Une erreur est survenue lors de la réinitialisation.';

          console.error('Reset password error:', error.error);
        },
      });
  }
}
