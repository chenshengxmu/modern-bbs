import { Request, Response } from 'express';
import * as boardService from '../services/board.service';
import { catchAsync } from '../utils/catchAsync';
import { sendSuccess } from '../utils/response';

export const getBoards = catchAsync(async (req: Request, res: Response) => {
  const boards = await boardService.getBoards();
  sendSuccess(res, boards);
});
