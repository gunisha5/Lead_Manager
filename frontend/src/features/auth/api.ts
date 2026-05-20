import { apiClient } from '@/lib/axios';
import { AuthResponse, MeResponse } from './types';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterCredentials = z.infer<typeof registerSchema>;

export const login = async (data: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/register', data);
  return response.data;
};

export const getMe = async (): Promise<MeResponse> => {
  const response = await apiClient.get<MeResponse>('/auth/me');
  return response.data;
};

export const refreshTokens = async (refreshToken: string): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/refresh-token', { refreshToken });
  return response.data;
};
