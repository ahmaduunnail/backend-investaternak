import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createTransaction = async (
    total: number,
    totalPromo: number,
    profileId: string,
    listOfPromoCodeId: string[] | undefined,
    // Transaction detail
    listOfTransaction: { unitBought: number, productId: string }[],
) => {
    return await prisma.transaction.create({
        data: {
            total,
            totalPromo,
            profileId,
            transactionDetail: {
                createMany: {
                    data: listOfTransaction
                }
            },
            promoCode: listOfPromoCodeId ? {
                createMany: {
                    data: listOfPromoCodeId.map(it => ({
                        promoCodeId: it
                    }))
                }
            } : undefined
        },
    })
}

export const fetchAllTransaction = async (page: number, pageSize: number, deletedIncluded: boolean = false) => {
    const skip = (page - 1) * pageSize;

    const transactions = await prisma.profile.findMany({
        where: {
            deleted: deletedIncluded
        },
        omit: {
            deleted: !deletedIncluded
        },
        skip,
        take: pageSize,
    });

    const totalTransaction = transactions.length

    return {
        transactions,
        totalTransaction,
        totalPages: Math.ceil(totalTransaction / pageSize),
        currentPage: page,
    };
}

export const fetchAllTransactionByProfileId = async (profileId: string, page: number, pageSize: number, deletedIncluded: boolean = false) => {
    const skip = (page - 1) * pageSize;

    const transactions = await prisma.transaction.findMany({
        where: {
            profileId,
            deleted: deletedIncluded
        },
        omit: { deleted: !deletedIncluded },
        skip,
        take: pageSize,
    });

    const totalTransaction = transactions.length

    return {
        transactions,
        totalTransaction,
        totalPages: Math.ceil(totalTransaction / pageSize),
        currentPage: page,
    };
}

export const fetchTransactionDetailById = async (id: string) => {
    return await prisma.transaction.findUnique({
        relationLoadStrategy: 'join',
        where: {
            id
        },
        include: {
            transactionDetail: { include: { Product: true } },
            promoCode: true
        }
    })
}

export const updateTransaction = async (id: string, data: Partial<{
    total: number,
    totalPromo: number,
    profileId: string,
    deleted: boolean
}>,
    listOfPromoCodeId: string[],
    // Transaction detail
    listOfTransaction: { unitBought: number, productId: string }[],
) => {
    return await prisma.transaction.update({
        where: { id },
        data: {
            ...data,
            transactionDetail: {
                deleteMany: {},
                createMany: {
                    data: listOfTransaction
                }
            },
            promoCode: {
                deleteMany: {},
                createMany: {
                    data: listOfPromoCodeId.map(it => ({
                        promoCodeId: it
                    }))  // Add new promo codes
                }
            }
        },
    })
}

export const softDeleteTransaction = async (id: string) => {
    return await prisma.transaction.update({
        where: { id },
        data: {
            deleted: true,
            transactionDetail: {
                updateMany: {
                    where: { deleted: false },
                    data: { deleted: true }
                }
            }
        }
    })
}

export const deleteTransaction = async (id: string) => {
    return await prisma.transaction.delete({
        relationLoadStrategy: 'join',
        where: { id },
        include: {
            transactionDetail: true
        }
    })
}