// prisma/seed/games.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedGames() {
    await prisma.game.createMany({
        data: [
            {
                name: 'Farm Tycoon',
                description: 'A simulation game where players manage and grow their own farm.',
                rewardPoint: 500,
            },
            {
                name: 'Harvest Quest',
                description: 'An adventure game that involves farming challenges and rewards.',
                rewardPoint: 300,
            },
            {
                name: 'AgriHero',
                description: 'A game that focuses on innovative farming techniques and crop management.',
                rewardPoint: 400,
            },
            {
                name: 'Crop King',
                description: 'A competitive farming game where players compete to grow the best crops.',
                rewardPoint: 250,
            },
            {
                name: 'Green Thumb Challenge',
                description: 'A strategy game that challenges players to optimize farm resources and increase productivity.',
                rewardPoint: 350,
            },
        ],
        skipDuplicates: true
    });
}

seedGames()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
