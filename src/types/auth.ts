export interface User {
  id: string;
  name: string | null;
  email: string;
  email_verified: boolean;
  phone_number: string;
  phone_number_verified: boolean;
  status: UserStatus;
}

export type UserStatus = 'unverified' | 'verified' | 'pending_verification' | 'inactive' | 'blocked';

export interface AuthResponse {
  message: string | null;
  data: {
    token: string;
    user: User;
  };
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  phone_number: string;
  password: string;
}