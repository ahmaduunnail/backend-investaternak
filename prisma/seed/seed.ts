import { PrismaClient } from '@prisma/client';
import { seedUsers } from './users';
import { seedArticles } from './articles';

const prisma = new PrismaClient();

async function main() {
    // Import and execute seed functions from each seed file
    const { seedUsers } = await import('./users');
    const { seedArticles } = await import('./articles');
    const { seedCommunities } = await import('./community');
    const { seedGames } = await import('./games');
    const { seedLiveChats } = await import('./livechats');
    const { seedProducts } = await import('./products');
    const { seedPromoCodes } = await import('./promocode');
    const { seedTransactions } = await import('./transactions');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
