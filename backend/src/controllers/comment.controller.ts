import { Response } from 'express';
import * as commentService from '../services/comment.service';
import { catchAsync } from '../utils/catchAsync';
import { sendSuccess } from '../utils/response';

export const addComment = catchAsync(async (req: any, res: Response) => {
  const { content } = req.body;
  const postId = req.params.id;
  const authorId = req.user.id;
  
  const comment = await commentService.createComment({ content, postId, authorId });
  sendSuccess(res, comment);
});
