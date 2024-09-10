import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPromo = async (
  promoCode: string,
  discount: number
) => {
  return await prisma.promoCode.create({
    data: {
      promoCode,
      discount
    },
  });
};

export const fetchPromoByKeyword = async (searchTerm: string, page: number, pageSize: number, deletedIncluded: boolean = false) => {
  const skip = (page - 1) * pageSize;

  const promos = await prisma.promoCode.findMany({
    where: {
      promoCode: { search: searchTerm }, deleted: deletedIncluded ? undefined : false
    },
    omit: {
      deleted: !deletedIncluded
    },
    skip,
    take: pageSize,
  });

  const totalPromos = promos.length

  return {
    promos,
    totalPromos,
    totalPages: Math.ceil(totalPromos / pageSize),
    currentPage: page,
  };
}

export const fetchPromoByDiscount = async (minDisc: number, maxDisc: number, page: number, pageSize: number, deletedIncluded: boolean = false) => {
  const skip = (page - 1) * pageSize;

  const promos = await prisma.promoCode.findMany({
    where: {
      discount: { lte: maxDisc, gte: minDisc }, deleted: deletedIncluded ? undefined : false
    },
    omit: {
      deleted: !deletedIncluded
    },
    skip,
    take: pageSize,
  });

  const totalPromos = promos.length

  return {
    promos,
    totalPromos,
    totalPages: Math.ceil(totalPromos / pageSize),
    currentPage: page,
  };
}

export const fetchAllPromo = async (page: number, pageSize: number, deletedIncluded: boolean = false) => {
  const skip = (page - 1) * pageSize;

  const promos = await prisma.promoCode.findMany({
    where: {
      deleted: deletedIncluded ? undefined : false
    },
    omit: { deleted: !deletedIncluded },
    skip: skip,
    take: pageSize,
  });

  const totalPromos = await prisma.promoCode.count();

  return {
    promos,
    totalPromos,
    totalPages: Math.ceil(totalPromos / pageSize),
    currentPage: page,
  };
};

export const updatePromo = async (
  id: string,
  data: Partial<{
    promoCode: string,
    discount: number,
    deleted: boolean
  }>
) => {
  return await prisma.promoCode.update({
    where: { id },
    data,
  });
};

export const softdeletedPromo = async (id: string) => {
  return await prisma.promoCode.update({
    where: { id },
    data: {
      deleted: true
    }
  })
}

// export const deletePromo = async (id: string) => {
//   return await prisma.promoCode.delete({
//     where: { id },
//   });
// };
