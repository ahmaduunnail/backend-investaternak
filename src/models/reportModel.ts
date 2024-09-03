import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createReport = async (
  url: string,
  idDetailProduct: string
) => {
  return await prisma.productReport.create({
    data: {
      url,
      ProductDetail: {
        connect: { id: idDetailProduct }
      }
    },
  });
};

export const fetchAllReport = async (page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;

  const reports = await prisma.productReport.findMany({
    skip: skip,
    take: pageSize,
  });

  const totalReports = await prisma.productReport.count();

  return {
    reports,
    totalReports,
    totalPages: Math.ceil(totalReports / pageSize),
    currentPage: page,
  };
};

export const fetchAllReportByProductDetailId = async (id: string, page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;

  const reports = await prisma.productReport.findMany({
    where: {
      productDetailId: id
    },
    skip: skip,
    take: pageSize,
  });

  const totalReports = await prisma.productReport.count();

  return {
    reports,
    totalReports,
    totalPages: Math.ceil(totalReports / pageSize),
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
  }>,
  idDetailProduct: string | undefined
) => {
  return await prisma.productReport.update({
    where: { id },
    data: {
      ...data,
      ProductDetail: idDetailProduct ? { connect: { id: idDetailProduct } } : undefined
    },
  });
};

export const deleteReport = async (id: string) => {
  return await prisma.productReport.delete({
    where: { id },
  });
};
