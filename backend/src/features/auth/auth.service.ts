import jwt from 'jsonwebtoken';
import { User } from './auth.model';
import { RegisterDTO, LoginDTO } from './auth.schema';
import { AuthTokens, UserRole } from './auth.types';
import { AppError } from '../../utils/AppError';
import { env } from '../../config/env';

export const generateTokens = (id: string): AuthTokens => {
  const accessToken = jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as any,
  });

  const refreshToken = jwt.sign({ id }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as any,
  });

  return { accessToken, refreshToken };
};

export const registerUser = async (data: RegisterDTO) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new AppError('Email already in use', 400);
  }

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: data.password,
    role: UserRole.SALES,
  });

  const tokens = generateTokens(user.id);

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    tokens,
  };
};

export const loginUser = async (data: LoginDTO) => {
  const user = await User.findOne({ email: data.email }).select('+password');
  if (!user || !(await user.comparePassword(data.password))) {
    throw new AppError('Invalid email or password', 401);
  }

  const tokens = generateTokens(user.id);

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    tokens,
  };
};

export const refreshAuthToken = async (refreshToken: string) => {
  try {
    const decoded: any = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
    
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new AppError('The user belonging to this token no longer exists.', 401);
    }

    const tokens = generateTokens(user.id);
    return { tokens };
  } catch (error) {
    throw new AppError('Invalid refresh token or token has expired.', 401);
  }
};
