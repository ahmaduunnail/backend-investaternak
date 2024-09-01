import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createReport = async (
  url: string
) => {
  return await prisma.productReport.create({
    data: {
      url
    },
  });
};

export const fetchAllReport = async (page: number, pasgeSize: number) => {
  const skip = (page - 1) * pasgeSize;

  const productReports = await prisma.productReport.findMany({
    skip: skip,
    take: pasgeSize,
  });

  const totalReports = await prisma.productReport.count();

  return {
    users: productReports,
    totalUsers: totalReports,
    totalPages: Math.ceil(totalReports / pasgeSize),
    currentPage: page,
  };
};

export const fetchAllReportByProductDetailId = async (id: string, page: number, pasgeSize: number) => {
  const skip = (page - 1) * pasgeSize;

  const productReports = await prisma.productReport.findMany({
    where: {
      productDetailId: id
    },
    skip: skip,
    take: pasgeSize,
  });

  const totalReports = await prisma.productReport.count();

  return {
    users: productReports,
    totalUsers: totalReports,
    totalPages: Math.ceil(totalReports / pasgeSize),
    currentPage: page,
  };
};

export const fetchReportById = async (id: string) => {
  return await prisma.productReport.findUnique({
    where: { id }
  })
}

export const updateReport = async (
  id: string,
  data: Partial<{
    url: string,
  }>
) => {
  return await prisma.productReport.update({
    where: { id },
    data,
  });
};

export const deleteReport = async (id: string) => {
  return await prisma.productReport.delete({
    where: { id },
  });
};
