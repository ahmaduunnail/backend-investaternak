import * as livechatModels from "../models/livechatModels";

// Basic CRUD

export const createLiveChat = async (name: string, userId: string) => {
    //Caching stuff

    return await livechatModels.createLiveChat(name, userId)
}

export const createMessage = async (livechatId: string, userId: string, text: string, attachmentUrl: string, attachmentHash: string) => {
    //Caching stuff

    return await livechatModels.createMessageOnComunity(livechatId, userId, text, attachmentUrl, attachmentHash)
}

export const getAllLiveChat = async (page: number, pageSize: number, wasAdmin: boolean = false) => {
    //Caching stuff

    return await livechatModels.fetchAllLiveChat(page, pageSize, wasAdmin)
}

export const getLiveChatByKeyword = async (searchTerm: string, page: number, pageSize: number, wasAdmin: boolean = false) => {
    //caching stuff

    return await livechatModels.fetchLiveChatByKeyword(searchTerm, page, pageSize, wasAdmin)
}

export const getMessageOnLiveChatByKeyword = async (idLiveChat: string, searchTerm: string, page: number, pageSize: number, wasAdmin: boolean = false) => {
    //caching stuff

    return await livechatModels.fetchMessageOnLiveChatByKeyword(idLiveChat, searchTerm, page, pageSize, wasAdmin)
}

export const getMessageOnLiveChat = async (idLiveChat: string, page: number, pageSize: number, wasAdmin: boolean = false) => {
    //caching stuff

    return await livechatModels.fetchMessageOnLiveChat(idLiveChat, page, pageSize, wasAdmin)
}

export const updateLiveChat = async (id: string, data: Partial<{
    name: string,
    description: string
    deleted: boolean
}>, userId?: string) => {
    //caching stuff
    return await livechatModels.updateLiveChat(id, data, userId)
}

export const updateMessageOnLiveChat = async (id: string, data: Partial<{
    text: string,
    deleted: boolean
}>, attachmentUrl?: string,
    attachmentHash?: string) => {
    //caching stuff
    return await livechatModels.updateMessageOnLiveChat(id, data, attachmentUrl, attachmentHash)
}

export const restoreLiveChat = async (id: string) => {
    //caching stuff
    return await livechatModels.updateLiveChat(id, {
        deleted: false
    })
}

export const removeLiveChat = async (id: string) => {
    //caching stuff
    return await livechatModels.softDeleteLiveChat(id)
}

export const restoreMessageLiveChat = async (id: string) => {
    //caching stuff
    return await livechatModels.updateMessageOnLiveChat(id, {
        deleted: false
    })
}

export const removeMessageLiveChat = async (id: string) => {
    //caching stuff
    return await livechatModels.softDeleteMessageOnLiveChat(id)
}
