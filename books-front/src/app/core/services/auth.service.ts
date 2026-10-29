import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailOtpRequest,
  VerifyEmailOtpResponse,
} from '../../types/auth';

import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: LoginResponse['user'] | null = null;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_CONFIG.baseUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          if (response.token) {
            this.cookieService.set(
              'token',
              response.token,
              1,
              '/',
              undefined,
              false,
              'Lax',
            );
          }

          if (response.user) {
            this.currentUser = response.user;

            this.cookieService.set(
              'role',
              response.user.role,
              1,
              '/',
              undefined,
              false,
              'Lax',
            );
          }
        }),
      );
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${API_CONFIG.baseUrl}/register`,
      data,
    );
  }

  verifyEmailOtp(
    data: VerifyEmailOtpRequest,
  ): Observable<VerifyEmailOtpResponse> {
    return this.http.post<VerifyEmailOtpResponse>(
      `${API_CONFIG.baseUrl}/verify-email`,
      data,
    );
  }

  forgotPassword(
    data: ForgotPasswordRequest,
  ): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(
      `${API_CONFIG.baseUrl}/forgot-password`,
      data,
    );
  }

  resetPassword(data: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(
      `${API_CONFIG.baseUrl}/reset-password`,
      data,
    );
  }

  getToken(): string {
    return this.cookieService.get('token');
  }

  isLoggedIn(): boolean {
    return this.getToken().length > 0;
  }

  isAdmin(): boolean {
    return this.cookieService.get('role') === 'admin';
  }

  getUser(): LoginResponse['user'] | null {
    return this.currentUser;
  }

  logout(): void {
    this.cookieService.delete('token', '/');
    this.cookieService.delete('role', '/');
    this.currentUser = null;
  }
}
