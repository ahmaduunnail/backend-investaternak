import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createGame = async (
    name: string,
    description: string,
    rewardPoint: number
) => {
    return await prisma.game.create({
        data: {
            name,
            description,
            rewardPoint
        },
    });
};

export const fetchAllGame = async (page: number, pageSize: number, deletedIncluded: boolean = false) => {
    const skip = (page - 1) * pageSize;

    const games = await prisma.game.findMany({
        skip: skip,
        take: pageSize,
        where: { deleted: deletedIncluded ? undefined : false },
        omit: { deleted: !deletedIncluded }
    });

    const totalGames = await prisma.game.count();

    return {
        games,
        totalGames,
        totalPages: Math.ceil(totalGames / pageSize),
        currentPage: page,
    };
};

export const fetchGameByKeyword = async (searchTerm: string, page: number, pageSize: number, deletedIncluded: boolean = false) => {
    const skip = (page - 1) * pageSize;

    const games = await prisma.game.findMany({
        where: {
            name: { search: searchTerm },
            description: { search: searchTerm },
            deleted: deletedIncluded ? false : undefined
        },
        omit: {
            deleted: !deletedIncluded
        },
        skip,
        take: pageSize,
    });

    const totalGames = games.length

    return {
        games,
        totalGames,
        totalPages: Math.ceil(totalGames / pageSize),
        currentPage: page,
    };
}

export const getGameById = async (id: string, deletedIncluded: boolean = false) => {
    return await prisma.game.findUnique({ where: { id, deleted: deletedIncluded ? false : undefined }, omit: { deleted: !deletedIncluded } })
}

export const updateGame = async (
    id: string,
    data: Partial<{
        name: string,
        description: string,
        rewardPoint: number,
        deleted: boolean
    }>
) => {
    return await prisma.game.update({
        where: { id },
        data,
    });
};

export const softDelete = async (id: string) => {
    return await prisma.game.update({
        where: { id },
        data: {
            deleted: true
        }
    })
}

export const deleteUser = async (id: string) => {
    return await prisma.game.delete({
        where: { id },
    });
};
