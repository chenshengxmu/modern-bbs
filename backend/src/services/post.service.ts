import { prisma } from '../lib/prisma';
import { AppError } from '../utils/AppError';

export const getPosts = async (params: { boardId?: string; page: number; limit: number; search: string }) => {
  const { boardId, page, limit, search } = params;
  const skip = (page - 1) * limit;
  
  const where: any = {};
  if (boardId) where.boardId = boardId;
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { content: { contains: search } },
    ];
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: {
        author: { select: { username: true, level: true, avatarUrl: true } },
        board: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.post.count({ where })
  ]);

  return {
    posts,
    totalPages: Math.ceil(total / limit),
    currentPage: page
  };
};

export const getPostById = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: { select: { username: true, level: true, avatarUrl: true, points: true } },
      board: { select: { name: true } },
      comments: {
        include: { author: { select: { username: true, level: true, avatarUrl: true } } },
        orderBy: { createdAt: 'asc' }
      }
    },
  });
  
  if (!post) throw new AppError('Post not found', 404);
  
  await prisma.post.update({ where: { id }, data: { viewCount: { increment: 1 } } });
  return post;
};

export const createPost = async (data: { title: string; content: string; boardId: string; authorId: string }) => {
  let { title, content, boardId, authorId } = data;
  
  if (authorId === 'admin-fixed-id') {
    const admin = await prisma.user.findUnique({ where: { username: 'Admin' } });
    authorId = admin?.id as string;
  }
  
  const post = await prisma.post.create({
    data: { title, content, boardId, authorId },
    include: { author: { select: { username: true, level: true } } }
  });
  
  await prisma.user.update({ where: { id: authorId }, data: { points: { increment: 5 } } });
  return post;
};

export const toggleLike = async (postId: string, userId: string) => {
  let finalUserId = userId;
  if (finalUserId === 'admin-fixed-id') {
    const admin = await prisma.user.findUnique({ where: { username: 'Admin' } });
    finalUserId = admin?.id as string;
  }

  const existingLike = await prisma.like.findUnique({
    where: { userId_postId: { userId: finalUserId, postId } }
  });

  if (existingLike) {
    await prisma.like.delete({ where: { id: existingLike.id } });
    await prisma.post.update({ where: { id: postId }, data: { likeCount: { decrement: 1 } } });
    return { liked: false };
  } else {
    await prisma.like.create({ data: { userId: finalUserId, postId } });
    await prisma.post.update({ where: { id: postId }, data: { likeCount: { increment: 1 } } });
    return { liked: true };
  }
};
