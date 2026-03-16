import { PrismaClient } from '@prisma/client';
import path from 'path';

const dbPath = path.resolve(__dirname, '../../dev.db');
console.log('Connecting to database at:', dbPath);

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${dbPath}`
    }
  }
});

async function main() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      points: true,
      level: true,
      createdAt: true,
      _count: {
        select: {
          posts: true,
          comments: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  console.log('--- ALL USERS IN DATABASE ---');
  console.table(users.map(u => ({
    ID: u.id,
    Username: u.username,
    Email: u.email,
    Points: u.points,
    Level: u.level,
    Posts: u._count.posts,
    Comments: u._count.comments,
    Joined: u.createdAt.toISOString().split('T')[0]
  })));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
