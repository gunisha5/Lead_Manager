export enum UserRole {
  ADMIN = 'admin',
  SALES = 'sales',
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
