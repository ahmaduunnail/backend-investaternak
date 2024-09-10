import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCommunity = async (
    name: string,
    description: string,
    userId: string,
) => {
    return await prisma.community.create({
        data: {
            name,
            description,
            User: {
                connect: { id: userId }
            }
        },
    });
};

export const createMessageOnComunity = async (communityId: string, userId: string, text: string, attachmentUrl: string, attachmentHash: string) => {
    return prisma.message.create({
        data: {
            Community: {
                connect: { id: communityId }
            },
            user: {
                connect: { id: userId }
            },
            text,
            MessageAttachment: {
                connectOrCreate: {
                    where: {
                        hash: attachmentHash
                    },
                    create: {
                        urlToAttachment: attachmentUrl,
                        hash: attachmentHash
                    }
                }
            }
        }
    })
}

export const fetchCommunityByKeyword = async (searchTerm: string, page: number, pageSize: number, deletedIncluded: boolean = false) => {
    const skip = (page - 1) * pageSize;

    let communities = await prisma.community.findMany({
        where: {
            name: { search: searchTerm },
            description: { search: searchTerm },
            deleted: deletedIncluded
        },
        omit: {
            deleted: !deletedIncluded
        },
        skip,
        take: pageSize,
    });

    const totalCommunities = communities.length

    return {
        communities,
        totalCommunitys: totalCommunities,
        totalPages: Math.ceil(totalCommunities / pageSize),
        currentPage: page,
    };
}

export const fetchMessageOnCommunityByKeyword = async (idCommunity: string, searchTerm: string, page: number, pageSize: number, deletedIncluded: boolean = false) => {
    const skip = (page - 1) * pageSize;

    const messages = await prisma.message.findMany({
        relationLoadStrategy: 'join',
        where: {
            text: { search: searchTerm },
            communityId: idCommunity,
            deleted: deletedIncluded
        },
        omit: {
            deleted: !deletedIncluded
        },
        skip,
        take: pageSize,
        include: {
            user: true,
            MessageAttachment: true
        }
    });

    const totalMessages = messages.length

    return {
        messages,
        totalMessages,
        totalPages: Math.ceil(totalMessages / pageSize),
        currentPage: page,
    };
}

export const fetchAllCommunity = async (page: number, pageSize: number, deletedIncluded: boolean = false) => {
    const skip = (page - 1) * pageSize;

    const communities = await prisma.community.findMany({
        skip: skip,
        take: pageSize,
        where: {
            deleted: deletedIncluded
        },
        omit: {
            deleted: !deletedIncluded
        }
    });

    const totalCommunities = await prisma.community.count();

    return {
        communities,
        totalCommunities,
        totalPages: Math.ceil(totalCommunities / pageSize),
        currentPage: page,
    };
};

export const fetchMessageOnCommunity = async (idCommunity: string, page: number, pageSize: number, deletedIncluded: boolean = false) => {
    const skip = (page - 1) * pageSize;

    const messages = await prisma.message.findMany({
        relationLoadStrategy: 'join',
        where: {
            communityId: idCommunity,
            deleted: deletedIncluded
        },
        skip: skip,
        take: pageSize,
        include: {
            user: true,
            MessageAttachment: true
        },
        omit: {
            deleted: !deletedIncluded
        }
    });

    const totalMessages = messages.length;

    return {
        messages,
        totalMessages,
        totalPages: Math.ceil(totalMessages / pageSize),
        currentPage: page,
    };
}

export const updateCommunity = async (
    id: string,
    data: Partial<{
        name: string,
        description: string
        deleted: boolean
    }>,
    userId: string
) => {
    return await prisma.community.update({
        where: { id },
        data: {
            ...data,
            User: userId ? { connect: { id: userId } } : undefined
        },
    });
};

export const updateMessageOnCommunity = async (idMessage: string,
    data: Partial<{
        text: string,
        deleted: boolean
    }>,
    attachmentUrl: string,
    attachmentHash: string
) => {
    return await prisma.message.update({
        where: { id: idMessage, liveChatId: null },
        data: {
            ...data,
            MessageAttachment: attachmentUrl ? {
                connectOrCreate: {
                    where: { hash: attachmentHash },
                    create: { urlToAttachment: attachmentUrl, hash: attachmentHash }
                }
            } : undefined
        }
    })
}

export const softDeleteMessageOnCommunity = async (idMessage: string) => {
    return await prisma.message.update({
        where: { id: idMessage },
        data: {
            deleted: true
        }
    })
}

export const softDeleteCommunity = async (id: string) => {
    return await prisma.community.update({
        where: { id },
        data: {
            deleted: true
        }
    });
};

export const deleteMessageOnCommunity = async (idMessage: string) => {
    return await prisma.message.delete({
        where: { id: idMessage }
    })
}

export const deleteCommunity = async (id: string) => {
    return await prisma.community.delete({
        relationLoadStrategy: 'join',
        where: { id },
        include: {
            Message: true
        }
    });
};
