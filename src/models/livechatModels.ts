import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createLiveChat = async (
    name: string,
    userId: string,
) => {
    return await prisma.liveChat.create({
        data: {
            name,
            User: {
                connect: { id: userId }
            }
        },
    });
};

export const createMessageOnComunity = async (liveChatId: string, userId: string, text: string, attachmentUrl: string, attachmentHash: string) => {
    return prisma.message.create({
        data: {
            LiveChat: {
                connect: { id: liveChatId }
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

export const fetchLiveChatByKeyword = async (searchTerm: string, page: number, pageSize: number, deletedIncluded: boolean = false) => {
    const skip = (page - 1) * pageSize;

    let communities = await prisma.liveChat.findMany({
        where: {
            name: { search: searchTerm },
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
        totalLiveChats: totalCommunities,
        totalPages: Math.ceil(totalCommunities / pageSize),
        currentPage: page,
    };
}

export const fetchMessageOnLiveChatByKeyword = async (idLiveChat: string, searchTerm: string, page: number, pageSize: number, deletedIncluded: boolean = false) => {
    const skip = (page - 1) * pageSize;

    const messages = await prisma.message.findMany({
        relationLoadStrategy: 'join',
        where: {
            text: { search: searchTerm },
            liveChatId: idLiveChat,
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

export const fetchAllLiveChat = async (page: number, pageSize: number, deletedIncluded: boolean = false) => {
    const skip = (page - 1) * pageSize;

    const communities = await prisma.liveChat.findMany({
        skip: skip,
        take: pageSize,
        where: {
            deleted: deletedIncluded
        },
        omit: {
            deleted: !deletedIncluded
        }
    });

    const totalCommunities = await prisma.liveChat.count();

    return {
        communities,
        totalCommunities,
        totalPages: Math.ceil(totalCommunities / pageSize),
        currentPage: page,
    };
};

export const fetchMessageOnLiveChat = async (idLiveChat: string, page: number, pageSize: number, deletedIncluded: boolean = false) => {
    const skip = (page - 1) * pageSize;

    const messages = await prisma.message.findMany({
        relationLoadStrategy: 'join',
        where: {
            liveChatId: idLiveChat,
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

export const updateLiveChat = async (
    id: string,
    data: Partial<{
        name: string,
        description: string
        deleted: boolean
    }>,
    userId: string
) => {
    return await prisma.liveChat.update({
        where: { id },
        data: {
            ...data,
            User: userId ? { connect: { id: userId } } : undefined
        },
    });
};

export const updateMessageOnLiveChat = async (idMessage: string,
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

export const softDeleteMessageOnLiveChat = async (idMessage: string) => {
    return await prisma.message.update({
        where: { id: idMessage },
        data: {
            deleted: true
        }
    })
}

export const softDeleteLiveChat = async (id: string) => {
    return await prisma.liveChat.update({
        where: { id },
        data: {
            deleted: true
        }
    });
};

export const deleteMessageOnLiveChat = async (idMessage: string) => {
    return await prisma.message.delete({
        where: { id: idMessage }
    })
}

export const deleteLiveChat = async (id: string) => {
    return await prisma.liveChat.delete({
        relationLoadStrategy: 'join',
        where: { id },
        include: {
            Message: true
        }
    });
};
