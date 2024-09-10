import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const saveToken = async (userId: string, token: string, expiresAt: Date) => {
    return prisma.token.create({
        data: {
            userId,
            token,
            expiresAt,
        },
    });
};

export const findToken = async (token: string) => {
    return prisma.token.findUnique({
        where: { token },
        include: {
            user: {
                select: {
                    role: true
                }
            }
        }
    });
};

export const deleteToken = async (token: string) => {
    return prisma.token.delete({
        where: { token },
    });
};

export const deleteTokensByUserId = async (userId: string) => {
    return prisma.token.deleteMany({
        where: { userId },
    });
};
