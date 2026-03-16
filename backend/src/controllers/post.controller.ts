import { Request, Response } from 'express';
import * as postService from '../services/post.service';
import { catchAsync } from '../utils/catchAsync';
import { sendSuccess } from '../utils/response';

export const getPosts = catchAsync(async (req: Request, res: Response) => {
  const boardId = req.query.boardId as string | undefined;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search as string || '';

  const result = await postService.getPosts({ boardId, page, limit, search });
  sendSuccess(res, result);
});

export const getPostById = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.getPostById(req.params.id as string);
  sendSuccess(res, result);
});

export const createPost = catchAsync(async (req: any, res: Response) => {
  const { title, content, boardId } = req.body;
  const authorId = req.user.id;
  
  const result = await postService.createPost({ title, content, boardId, authorId });
  sendSuccess(res, result);
});

export const likePost = catchAsync(async (req: any, res: Response) => {
  const postId = req.params.id;
  const userId = req.user.id;
  
  const result = await postService.toggleLike(postId, userId);
  sendSuccess(res, result);
});
