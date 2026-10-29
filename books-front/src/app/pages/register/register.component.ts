import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  loading = false;
  errorMessage = '';

  registerForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.maxLength(255)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_confirmation: ['', Validators.required],
      },
      {
        validators: (form: AbstractControl): ValidationErrors | null => {
          const password = form.get('password')?.value;
          const confirmation = form.get('password_confirmation')?.value;

          if (!confirmation) {
            return null;
          }

          return password === confirmation ? null : { passwordMismatch: true };
        },
      },
    );
  }

  onSubmit(): void {
    if (this.registerForm.invalid || this.loading) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const data = this.registerForm.getRawValue();

    this.authService
      .register({
        name: data.name ?? '',
        email: data.email ?? '',
        password: data.password ?? '',
        password_confirmation: data.password_confirmation ?? '',
      })
      .subscribe({
        next: (response) => {
          this.loading = false;

          this.router.navigate(['/verify-email'], {
            queryParams: {
              email: response.user.email,
            },
          });
        },

        error: (error) => {
          this.loading = false;

          this.errorMessage =
            error.error?.message ??
            'Une erreur est survenue lors de la création du compte.';

          console.error('Register error:', error.error);
        },
      });
  }
}
