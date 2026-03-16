import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';
import { AppError } from '../utils/AppError';
import { z } from 'zod';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  if (err instanceof z.ZodError) {
    return sendError(res, err.issues[0]?.message || 'Invalid input', 400);
  }

  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode);
  }

  sendError(res, err.message || 'Internal Server Error', 500);
};
