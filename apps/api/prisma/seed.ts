import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await argon2.hash('Admin123!');
  const userPassword = await argon2.hash('User123!');

  // Admin
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      handle: '@admin',
      name: 'Super Admin',
      passwordHash,
      role: 'ADMIN',
      isVerified: true,
      bio: 'System Administrator',
      avatar: 'https://ui-avatars.com/api/?name=Admin',
    },
  });

  // Regular Users
  const users = [
    { email: 'alex@example.com', name: 'Alex Developer', handle: '@alexdev' },
    { email: 'sarah@example.com', name: 'Sarah Designer', handle: '@sarahd' },
    { email: 'mike@example.com', name: 'Mike Manager', handle: '@mikem' },
  ];

  for (const u of users) {
    const createdUser = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        handle: u.handle,
        name: u.name,
        passwordHash: userPassword,
        role: 'USER',
        isVerified: true,
        avatar: `https://ui-avatars.com/api/?name=${u.name}`,
        posts: {
            create: [
                { content: `Hello world! This is ${u.name} joining StorySpark.` }
            ]
        }
      },
    });
    console.log(`Seeded user: ${createdUser.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    (process as any).exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });