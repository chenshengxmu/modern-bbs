import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import path from 'path';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${path.join(__dirname, '../prisma/dev.db')}`,
    },
  },
});

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create Boards
  const general = await prisma.board.upsert({
    where: { name: 'General' },
    update: {},
    create: {
      name: 'General',
      description: 'Chat about anything',
      icon: 'MessageSquare',
      order: 1,
    },
  });

  const tech = await prisma.board.upsert({
    where: { name: 'Tech Talk' },
    update: {},
    create: {
      name: 'Tech Talk',
      description: 'Gadgets and coding',
      icon: 'LayoutGrid',
      order: 2,
    },
  });

  // 2. Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { username: 'Admin' },
    update: {},
    create: {
      username: 'Admin',
      email: 'admin@example.com',
      passwordHash: hashedPassword,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
      points: 1000,
      level: 10,
    },
  });

  // 3. Create Sample Posts
  await prisma.post.create({
    data: {
      title: 'Welcome to the new Modern BBS!',
      content: 'This is the first post on our brand new platform built with React and Node.js. Feel free to explore and discuss!',
      authorId: admin.id,
      boardId: general.id,
      viewCount: 150,
      likeCount: 25,
    },
  });

  console.log('✅ Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
