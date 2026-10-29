export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string
  };
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  password: string;
  password_confirmation: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface VerifyEmailOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyEmailOtpResponse {
  message: string;
}
