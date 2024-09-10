import * as communityModels from "../models/communityModels";

// Basic CRUD

export const createCommunity = async (name: string, description: string, userId: string) => {
    //Caching stuff

    return await communityModels.createCommunity(name, description, userId)
}

export const createMessage = async (communityId: string, userId: string, text: string, attachmentUrl: string, attachmentHash: string) => {
    //Caching stuff

    return await communityModels.createMessageOnComunity(communityId, userId, text, attachmentUrl, attachmentHash)
}

export const getAllCommunity = async (page: number, pageSize: number, wasAdmin: boolean = false) => {
    //Caching stuff

    return await communityModels.fetchAllCommunity(page, pageSize, wasAdmin)
}

export const getCommunityByKeyword = async (searchTerm: string, page: number, pageSize: number, wasAdmin: boolean = false) => {
    //caching stuff

    return await communityModels.fetchCommunityByKeyword(searchTerm, page, pageSize, wasAdmin)
}

export const getMessageOnCommunityByKeyword = async (idCommunity: string, searchTerm: string, page: number, pageSize: number, wasAdmin: boolean = false) => {
    //caching stuff

    return await communityModels.fetchMessageOnCommunityByKeyword(idCommunity, searchTerm, page, pageSize, wasAdmin)
}

export const getMessageOnCommunity = async (idCommunity: string, page: number, pageSize: number, wasAdmin: boolean = false) => {
    //caching stuff

    return await communityModels.fetchMessageOnCommunity(idCommunity, page, pageSize, wasAdmin)
}

export const updateCommunity = async (id: string, data: Partial<{
    name: string,
    description: string
    deleted: boolean,
}>, userId?: string) => {
    //caching stuff
    return await communityModels.updateCommunity(id, data, userId)
}

export const updateMessageOnCommunity = async (id: string, data: Partial<{
    text: string,
    deleted: boolean
}>, attachmentUrl?: string,
    attachmentHash?: string) => {
    //caching stuff
    return await communityModels.updateMessageOnCommunity(id, data, attachmentUrl, attachmentHash)
}

export const restoreCommunity = async (id: string) => {
    //caching stuff
    return await communityModels.updateCommunity(id, {
        deleted: false
    })
}

export const removeCommunity = async (id: string) => {
    //caching stuff
    return await communityModels.softDeleteCommunity(id)
}

export const restoreMessageCommunity = async (id: string) => {
    //caching stuff
    return await communityModels.updateMessageOnCommunity(id, {
        deleted: false
    })
}

export const removeMessageCommunity = async (id: string) => {
    //caching stuff
    return await communityModels.softDeleteMessageOnCommunity(id)
}

// Community interactions

export const followUnfollowCommunity = async (id: string, userId: string) => {
    //caching stuff

    const existingLike = await communityModels.findFollowedCommunity(id, userId);
    let res: boolean;

    if (existingLike) {
        res = await communityModels.unfollowCommunity(id, userId);
    } else {
        res = await communityModels.followCommunity(id, userId)
    }

    return res ? "Successfully like article" : "Successfully dislike article"
}
