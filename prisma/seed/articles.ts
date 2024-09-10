// prisma/seed/articles.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedArticles() {
  await prisma.article.createMany({
    data: [
      {
        title: 'Introduction to Farm Investments',
        like: 10,
        content: 'An overview of why investing in farms can be a profitable venture and how it contributes to sustainable agriculture.',
        recomendedFor: 'Investors New to Farm Investments',
      },
      {
        title: 'Evaluating Farm Investment Opportunities',
        like: 18,
        content: 'Learn the key factors to consider when evaluating different farm investment opportunities, including land quality and crop potential.',
        recomendedFor: 'Experienced Investors',
      },
      {
        title: 'Understanding Crop Markets and Prices',
        like: 25,
        content: 'A guide on how crop markets work and how to assess potential profitability based on current and future market trends.',
        recomendedFor: 'Market Analysts and Investors',
      },
      {
        title: 'Risk Management in Farm Investments',
        like: 14,
        content: 'Explore strategies for managing risks associated with farm investments, including weather risks and market volatility.',
        recomendedFor: 'Risk-Aware Investors',
      },
      {
        title: 'Long-Term Strategies for Successful Farm Investments',
        like: 12,
        content: 'Insights into long-term planning and strategies to maximize returns and ensure sustainability in farm investments.',
        recomendedFor: 'Long-Term Investors',
      },
    ],
    skipDuplicates: true
  });
}

seedArticles()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
