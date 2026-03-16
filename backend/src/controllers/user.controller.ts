import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { catchAsync } from '../utils/catchAsync';
import { sendSuccess } from '../utils/response';

export const getLeaderboard = catchAsync(async (req: Request, res: Response) => {
  const leaderboard = await userService.getLeaderboard();
  sendSuccess(res, leaderboard);
});

export const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const userProfile = await userService.getUserProfile(req.params.username as string);
  sendSuccess(res, userProfile);
});
