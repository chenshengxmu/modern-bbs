import { prisma } from '../lib/prisma';
import { AppError } from '../utils/AppError';

export const getLeaderboard = async () => {
  return prisma.user.findMany({
    orderBy: { points: 'desc' },
    take: 10,
    select: {
      id: true,
      username: true,
      points: true,
      level: true,
      avatarUrl: true
    }
  });
};

export const getUserProfile = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      points: true,
      level: true,
      avatarUrl: true,
      createdAt: true,
      posts: {
        orderBy: { createdAt: 'desc' },
        include: {
          board: true,
          _count: { select: { comments: true } }
        }
      },
      _count: {
        select: {
          posts: true,
          comments: true,
          likes: true
        }
      }
    }
  });

  if (!user) throw new AppError('User not found', 404);

  const postLikes = await prisma.like.count({
    where: { post: { authorId: user.id } }
  });
  const commentLikes = await prisma.like.count({
    where: { comment: { authorId: user.id } }
  });

  return {
    ...user,
    totalLikesReceived: postLikes + commentLikes
  };
};
