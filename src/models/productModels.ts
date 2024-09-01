import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProduct = async (
    name: string,
    price: number,
    roi: number,
    startPeriod: string,
    endPeriod: string,
    // Product detail
    totalUnit: number,
    description: string,
    proposalUrl: string,
    minimumBuy: number,
) => {
    return await prisma.product.create({
        data: {
            name, price, roi, startPeriod, endPeriod,
            ProductDetail: {
                create: {
                    totalUnit, description, proposalUrl, minimumBuy,
                }
            }
        },
    });
};

export const findProductByKeyword = async (searchTerm: string, page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize;

    const users = await prisma.product.findMany({
        where: {
            name: {
                search: searchTerm
            }
        },
        include: {
            ProductDetail: {
                where: { description: searchTerm }
            }
        },
        skip,
        take: pageSize,
    });

    const totalUsers = users.length

    return {
        users,
        totalUsers,
        totalPages: Math.ceil(totalUsers / pageSize),
        currentPage: page,
    };
}

export const findProductByPrice = async (minPrice: number, maxPrice: number, page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize;

    const users = await prisma.product.findMany({
        where: {
            price: { lte: maxPrice, gte: minPrice }
        },
        skip,
        take: pageSize,
    });

    const totalUsers = users.length

    return {
        users,
        totalUsers,
        totalPages: Math.ceil(totalUsers / pageSize),
        currentPage: page,
    };
}

export const findProductByRoi = async (minRoi: number, maxRoi: number, page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize;

    const users = await prisma.product.findMany({
        where: {
            roi: { lte: maxRoi, gte: minRoi }

        },
        skip,
        take: pageSize,
    });

    const totalUsers = users.length

    return {
        users,
        totalUsers,
        totalPages: Math.ceil(totalUsers / pageSize),
        currentPage: page,
    };
}

export const findProductByPeriod = async (startPeriod: Date, endPeriod: Date, page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize;

    const users = await prisma.product.findMany({
        where: {
            startPeriod: { gte: startPeriod },
            endPeriod: { lte: endPeriod }
        },
        skip,
        take: pageSize,
    });

    const totalUsers = users.length

    return {
        users,
        totalUsers,
        totalPages: Math.ceil(totalUsers / pageSize),
        currentPage: page,
    };
}

export const fetchAllProduct = async (page: number, pasgeSize: number) => {
    const skip = (page - 1) * pasgeSize;

    const products = await prisma.product.findMany({
        skip: skip,
        take: pasgeSize,
    });

    const totalProducts = await prisma.product.count();

    return {
        users: products,
        totalUsers: totalProducts,
        totalPages: Math.ceil(totalProducts / pasgeSize),
        currentPage: page,
    };
};

export const findProductById = async (id: string) => {
    return await prisma.product.findUnique({
        where: { id },
        include: {
            ProductDetail: { include: { reports: {} } }
        }
    })
}

export const updateProduct = async (
    id: string,
    data: Partial<{
        name: string,
        price: number,
        roi: number,
        startPeriod: string,
        endPeriod: string,
    }>,
    dataDetail: Partial<{
        totalUnit: number,
        description: string,
        proposalUrl: string,
        minimumBuy: number,
    }>
) => {
    return await prisma.product.update({
        where: { id },
        data: {
            ...data,
            ProductDetail: {
                update: {
                    ...dataDetail
                }
            }
        },
    });
};

export const deleteProduct = async (id: string) => {
    return await prisma.product.delete({
        where: { id },
        include: {
            ProductDetail: {}
        },
    });
};
