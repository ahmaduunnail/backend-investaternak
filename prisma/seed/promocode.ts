// prisma/seed/promocode.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedPromoCodes() {
  await prisma.promoCode.createMany({
    data: [
      {
        promoCode: 'FARM10',
        discount: BigInt(1000), // Example discount in cents (e.g., $10.00)
      },
      {
        promoCode: 'GROW20',
        discount: BigInt(2000), // Example discount in cents (e.g., $20.00)
      },
      {
        promoCode: 'CROP15',
        discount: BigInt(1500), // Example discount in cents (e.g., $15.00)
      },
      {
        promoCode: 'SEED25',
        discount: BigInt(2500), // Example discount in cents (e.g., $25.00)
      },
      {
        promoCode: 'PLANT5',
        discount: BigInt(500), // Example discount in cents (e.g., $5.00)
      },
    ],
    skipDuplicates: true
  });
}

seedPromoCodes()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
