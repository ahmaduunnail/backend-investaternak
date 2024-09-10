import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUserIdByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });
  return user?.id;
};

const getLiveChatIdByName = async (name: string) => {
  const liveChat = await prisma.liveChat.findFirst({
    where: { name },
    select: { id: true },
  });
  return liveChat?.id;
};

export async function seedLiveChats() {
  const userIds = await Promise.all([
    getUserIdByUsername('john_doe'),
    getUserIdByUsername('jane_smith'),
    getUserIdByUsername('alice_johnson'),
  ]);

  // Create LiveChats
  const liveChats = await prisma.liveChat.createMany({
    data: [
      { name: 'General Chat', userId: userIds[0] },
      { name: 'Tech Talk', userId: userIds[1] },
      { name: 'Farm Updates', userId: userIds[2] },
    ],
    skipDuplicates: true,
  });

  // Get LiveChat IDs
  const liveChatIds = await Promise.all([
    getLiveChatIdByName('General Chat'),
    getLiveChatIdByName('Tech Talk'),
    getLiveChatIdByName('Farm Updates'),
  ]);

  // Create Messages
  await prisma.message.createMany({
    data: [
      { text: 'Welcome to the General Chat!', liveChatId: liveChatIds[0] },
      { text: 'Discuss the latest in tech here.', liveChatId: liveChatIds[1] },
      { text: 'Updates on farm investments.', liveChatId: liveChatIds[2] },
    ],
    skipDuplicates: true,
  });
}

seedLiveChats()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
