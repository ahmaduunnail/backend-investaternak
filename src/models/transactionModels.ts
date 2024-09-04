import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createTransaction = async (
    total: number,
    totalPromo: number,
    profileId: string,
    listOfPromdoCodeId: string[],
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
            promoCode: listOfPromdoCodeId.length
                ? { connect: listOfPromdoCodeId.map(code => ({ id: code })) }
                : undefined,
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
    listOfPromdoCodeId: string[],) => {
    return await prisma.transaction.update({
        where: { id }, data: {
            ...data, promoCode: {
                set: listOfPromdoCodeId.length
                    ? listOfPromdoCodeId.map(code => ({ id: code }))
                    : [], // Clear existing promo codes if none are provided
            },
        },
    })
}

export const updateDetailTransaction = async (idDetailTransation: string, data: Partial<{
    unitBought: number,
    productId: string,
    deleted: boolean
}>) => {
    return await prisma.transactionDetail.update({
        where: { id: idDetailTransation },
        data
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
        where: { id },
        include: {
            transactionDetail: true
        }
    })
}