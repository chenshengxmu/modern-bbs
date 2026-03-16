import { Request, Response } from 'express';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import * as authService from '../services/auth.service';
import { catchAsync } from '../utils/catchAsync';
import { sendSuccess } from '../utils/response';

export const register = catchAsync(async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);
  const result = await authService.registerUser(data);
  sendSuccess(res, result);
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);
  const result = await authService.loginUser(data);
  sendSuccess(res, result);
});
