import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  faGoogle = faGoogle;

  loading = false;
  errorMessage = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    if (this.loginForm.invalid || this.loading) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const credentials = this.loginForm.getRawValue();

    this.authService
      .login({
        email: credentials.email ?? '',
        password: credentials.password ?? '',
      })
      .subscribe({
        next: (response) => {
          this.loading = false;
          console.log('Login success:', response);

          if (this.authService.isAdmin()) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/books']);
          }
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage =
            error.error?.message ?? 'Email ou mot de passe incorrect.';
        },
      });
  }

  //connect by google
  loginWithGoogle(): void {
  window.location.href = 'http://127.0.0.1:8000/auth/google';
}
}
