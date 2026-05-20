export enum UserRole {
  ADMIN = 'admin',
  SALES = 'sales',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    tokens: AuthTokens;
  };
}

export interface MeResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}
