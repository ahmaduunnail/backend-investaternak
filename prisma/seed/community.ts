import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUserIdByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });
  return user?.id;
};

const getCommunityIdByName = async (name: string) => {
  const community = await prisma.community.findFirst({
    where: { name },
    select: { id: true },
  });
  return community?.id;
};

export async function seedCommunities() {
  const userIds = await Promise.all([
    getUserIdByUsername('john_doe'),
    getUserIdByUsername('jane_smith'),
    getUserIdByUsername('alice_johnson'),
  ]);

  // Create Communities
  const communities = await prisma.community.createMany({
    data: [
      { name: 'Investors Forum', description: 'Discuss investment opportunities', userId: userIds[0] },
      { name: 'Tech Enthusiasts', description: 'Talk about the latest in technology', userId: userIds[1] },
    ],
    skipDuplicates: true,
  });

  // Get Community IDs
  const communityIds = await Promise.all([
    getCommunityIdByName('Investors Forum'),
    getCommunityIdByName('Tech Enthusiasts'),
  ]);

  // Create Messages
  await prisma.message.createMany({
    data: [
      { text: 'Let’s discuss investment strategies!', communityId: communityIds[0] },
      { text: 'Share your latest tech finds.', communityId: communityIds[1] },
    ],
    skipDuplicates: true,
  });
}

seedCommunities()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
