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

export const findProductByKeyword = async (searchTerm: string, page: number, pageSize: number, deletedIncluded: boolean = false) => {
    const skip = (page - 1) * pageSize;

    const products = await prisma.product.findMany({
        relationLoadStrategy: 'join',
        where: {
            name: {
                search: searchTerm
            },
            deleted: deletedIncluded
        },
        omit: {
            deleted: !deletedIncluded
        },
        include: {
            ProductDetail: {
                where: { description: searchTerm }
            }
        },
        skip,
        take: pageSize,
    });

    const totalProducts = products.length

    return {
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / pageSize),
        currentPage: page,
    };
}

export const findProductByPrice = async (minPrice: number, maxPrice: number, page: number, pageSize: number, deletedIncluded: boolean = false) => {
    const skip = (page - 1) * pageSize;

    const products = await prisma.product.findMany({
        where: {
            price: { lte: maxPrice, gte: minPrice },
            deleted: deletedIncluded
        },
        omit: {
            deleted: !deletedIncluded
        },
        skip,
        take: pageSize,
    });

    const totalProducts = products.length

    return {
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / pageSize),
        currentPage: page,
    };
}

export const findProductByRoi = async (minRoi: number, maxRoi: number, page: number, pageSize: number, deletedIncluded: boolean = false) => {
    const skip = (page - 1) * pageSize;

    const products = await prisma.product.findMany({
        where: {
            roi: { lte: maxRoi, gte: minRoi },
            deleted: deletedIncluded
        },
        omit: {
            deleted: !deletedIncluded
        },
        skip,
        take: pageSize,
    });

    const totalProducts = products.length

    return {
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / pageSize),
        currentPage: page,
    };
}

export const findProductByPeriod = async (startPeriod: Date, endPeriod: Date, page: number, pageSize: number, deletedIncluded: boolean = false) => {
    const skip = (page - 1) * pageSize;

    const products = await prisma.product.findMany({
        where: {
            startPeriod: { gte: startPeriod },
            endPeriod: { lte: endPeriod },
            deleted: deletedIncluded
        },
        omit: {
            deleted: !deletedIncluded
        },
        skip,
        take: pageSize,
    });

    const totalProducts = products.length

    return {
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / pageSize),
        currentPage: page,
    };
}

export const fetchAllProduct = async (page: number, pageSize: number, deletedIncluded: boolean = false) => {
    const skip = (page - 1) * pageSize;

    const products = await prisma.product.findMany({
        where: {
            deleted: deletedIncluded
        },
        omit: {
            deleted: !deletedIncluded
        },
        skip: skip,
        take: pageSize,
    });

    const totalProducts = await prisma.product.count();

    return {
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / pageSize),
        currentPage: page,
    };
};

export const findProductById = async (id: string) => {
    return await prisma.product.findUnique({
        relationLoadStrategy: 'join',
        where: { id },
        include: {
            ProductDetail: { include: { reports: true } }
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
        deleted: boolean
    }>,
    dataDetail: Partial<{
        totalUnit: number,
        description: string,
        proposalUrl: string,
        minimumBuy: number,
        deleted: boolean
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

export const softDeleteProduct = async (id: string) => {
    return await prisma.product.update({
        where: { id },
        data: {
            deleted: true,
            ProductDetail: {
                update: {
                    data: {
                        deleted: true
                    }
                },
            }
        }
    });
};


// export const deleteProduct = async (id: string) => {
//     return await prisma.product.delete({
//         relationLoadStrategy: 'join',
//         where: { id },
//         include: {
//             ProductDetail: true
//         },
//     });
// };
