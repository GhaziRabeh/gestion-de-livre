import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reset-password-otp',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './reset-password-otp.component.html',
  styleUrls: ['./reset-password-otp.component.css'],
})
export class ResetPasswordOtpComponent {
  loading = false;
  errorMessage = '';
  successMessage = '';

  otpForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    const email = this.route.snapshot.queryParamMap.get('email') ?? '';

    this.otpForm = this.fb.group({
      email: [
        email,
        [Validators.required, Validators.email],
      ],
      otp: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{6}$/)],
      ],
    });
  }

  onSubmit(): void {
    if (this.otpForm.invalid || this.loading) {
      this.otpForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const data = this.otpForm.getRawValue();

    this.loading = false;

    this.router.navigate(['/reset-password'], {
      queryParams: {
        email: data.email,
        otp: data.otp,
      },
    });
  }
}