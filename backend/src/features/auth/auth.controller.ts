import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import * as authService from './auth.service';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.registerUser(req.body);
  res.status(201).json(ApiResponse.created('User registered successfully', result));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);
  res.status(200).json(ApiResponse.success('Login successful', result));
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.refreshAuthToken(req.body.refreshToken);
  res.status(200).json(ApiResponse.success('Token refreshed successfully', result));
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  res.status(200).json(ApiResponse.success('User details retrieved successfully', { user }));
});
