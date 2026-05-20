import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { asyncHandler } from '../utils/asyncHandler';

export const validateRequest = (schema: ZodSchema) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validatedData = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    }) as any;

    // In Express 5, req.query and req.params are read-only getters.
    // Only mutate req.body; leave query/params as-is (already validated above).
    if (validatedData.body !== undefined) {
      req.body = validatedData.body;
    }
    next();
  });
