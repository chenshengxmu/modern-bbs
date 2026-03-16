import { prisma } from '../lib/prisma';

export const getBoards = async () => {
  return prisma.board.findMany({ orderBy: { order: 'asc' } });
};
