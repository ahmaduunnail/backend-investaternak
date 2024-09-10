import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedTransactions() {
  // Helper function to get a random promo code
  async function getRandomPromoCode() {
    const promoCodes = await prisma.promoCode.findMany();
    if (promoCodes.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * promoCodes.length);
    return promoCodes[randomIndex];
  }

  // Get all profiles
  const profiles = await prisma.profile.findMany();
  if (profiles.length === 0) {
    throw new Error('No profiles found! Seed the profiles first.');
  }

  // Get all products
  const products = await prisma.product.findMany();
  if (products.length === 0) {
    throw new Error('No products found! Seed the products first.');
  }

  // Create Transactions
  await Promise.all(Array.from({ length: 10 }, async (_, index) => {
    const profile = profiles[Math.floor(Math.random() * profiles.length)];
    const transaction = await prisma.transaction.create({
      data: {
        total: BigInt(Math.floor(Math.random() * 100000) + 10000), // Random total between $100.00 and $1000.00
        totalPromo: BigInt(Math.floor(Math.random() * 50000)), // Random total promo between $0.00 and $500.00
        profileId: profile.id,
      },
    });

    // Randomly assign promo codes to some transactions
    if (Math.random() < 0.5) { // 50% chance of having a promo code
      const promoCode = await getRandomPromoCode();
      if (promoCode) {
        await prisma.transactionToPromoCode.create({
          data: {
            transactionId: transaction.id,
            promoCodeId: promoCode.id,
          },
        });
      }
    }

    // Create TransactionDetails
    await Promise.all(Array.from({ length: 3 }, async () => {
      const product = products[Math.floor(Math.random() * products.length)];
      await prisma.transactionDetail.create({
        data: {
          unitBought: Math.floor(Math.random() * 10) + 1, // Random units bought between 1 and 10
          transactionId: transaction.id,
          productId: product.id,
        },
      });
    }));
  }));
}

seedTransactions()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
