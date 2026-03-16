import { prisma } from '../lib/prisma';

export const createComment = async (data: { content: string; postId: string; authorId: string }) => {
  let { content, postId, authorId } = data;
  
  if (authorId === 'admin-fixed-id') {
    const admin = await prisma.user.findUnique({ where: { username: 'Admin' } });
    authorId = admin?.id as string;
  }

  const comment = await prisma.comment.create({
    data: { content, postId, authorId },
    include: { author: { select: { username: true, level: true, avatarUrl: true } } }
  });
  
  try {
    await prisma.user.update({ where: { id: authorId }, data: { points: { increment: 2 } } });
  } catch (e) {
    console.warn('Points update failed, but comment was created.');
  }

  return comment;
};
