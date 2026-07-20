export type UserRole = 'Admin' | 'Staff' | 'Technician';

export interface UserSummary {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}

export interface LoginResponse {
  accessToken: string;
  expiresAtUtc: string;
  user: UserSummary;
}

export interface LoginRequest {
  email: string;
  password: string;
}
