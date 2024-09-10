// prisma/seed/product.ts
import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

export async function seedProducts() {
  // Create Products related to cattle investments
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Angus Cattle Stock',
        price: BigInt(50000), // Example price in cents (e.g., $500.00)
        roi: new Decimal(0.20), // Example ROI (20%)
        startPeriod: new Date('2024-01-01'),
        endPeriod: new Date('2024-12-31'),
      },
      {
        name: 'Hereford Cattle Stock',
        price: BigInt(60000), // Example price in cents (e.g., $600.00)
        roi: new Decimal(0.18), // Example ROI (18%)
        startPeriod: new Date('2024-03-01'),
        endPeriod: new Date('2024-09-30'),
      },
      {
        name: 'Charolais Cattle Stock',
        price: BigInt(55000), // Example price in cents (e.g., $550.00)
        roi: new Decimal(0.22), // Example ROI (22%)
        startPeriod: new Date('2024-05-01'),
        endPeriod: new Date('2024-10-31'),
      },
      {
        name: 'Limousin Cattle Stock',
        price: BigInt(52000), // Example price in cents (e.g., $520.00)
        roi: new Decimal(0.17), // Example ROI (17%)
        startPeriod: new Date('2024-02-01'),
        endPeriod: new Date('2024-11-30'),
      },
      {
        name: 'Simmental Cattle Stock',
        price: BigInt(57000), // Example price in cents (e.g., $570.00)
        roi: new Decimal(0.19), // Example ROI (19%)
        startPeriod: new Date('2024-04-01'),
        endPeriod: new Date('2024-12-15'),
      },
    ],
    skipDuplicates: true
  });

  // Find all created products
  const createdProducts = await prisma.product.findMany({
    where: {
      name: {
        in: [
          'Angus Cattle Stock',
          'Hereford Cattle Stock',
          'Charolais Cattle Stock',
          'Limousin Cattle Stock',
          'Simmental Cattle Stock',
        ],
      },
    },
  });

  // Create ProductDetails for each product
  await Promise.all(createdProducts.map(product => {
    return prisma.productDetail.create({
      data: {
        description: `Detailed information about ${product.name}.`,
        proposalUrl: `https://example.com/${product.name?.replace(/ /g, '-').toLowerCase()}`,
        minimumBuy: BigInt(1000), // Example minimum buy in cents (e.g., $10.00)
        productId: product.id,
        totalUnit: 100
      },
    });
  }));

  // Find all created product details
  const productDetails = await prisma.productDetail.findMany({
    where: {
      Product: {
        name: {
          in: [
            'Angus Cattle Stock',
            'Hereford Cattle Stock',
            'Charolais Cattle Stock',
            'Limousin Cattle Stock',
            'Simmental Cattle Stock',
          ],
        },
      },
    },
  });

  // Create Reports for each product detail
  await Promise.all(productDetails.map(productDetail => {
    return prisma.productReport.create({
      data: {
        url: `https://example.com/report-${productDetail.productId}`,
        productDetailId: productDetail.id,
      },
    });
  }));
}

seedProducts()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
