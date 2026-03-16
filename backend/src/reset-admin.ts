import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import path from 'path';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${path.resolve(__dirname, '../dev.db')}`,
    },
  },
});

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { username: 'Admin' },
    update: { passwordHash: hashedPassword },
    create: {
      username: 'Admin',
      email: 'admin@example.com',
      passwordHash: hashedPassword,
      points: 1000,
      level: 10
    }
  });
  
  console.log('Admin user password has been reset to: admin123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
