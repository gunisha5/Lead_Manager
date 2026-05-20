import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/AppError';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    return res.status(statusCode).json({
      success: false,
      message,
      data: (err as any).errors,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Handle Mongoose Errors (example: Duplicate Key)
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered',
    });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Fallback for unexpected errors
  console.error('ERROR 💥', err);
  return res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'development' ? message : 'Something went wrong!',
  });
};
