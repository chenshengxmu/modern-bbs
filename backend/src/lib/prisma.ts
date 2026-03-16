import { PrismaClient } from '@prisma/client';

// Prisma will automatically read DATABASE_URL from the .env file
export const prisma = new PrismaClient();
