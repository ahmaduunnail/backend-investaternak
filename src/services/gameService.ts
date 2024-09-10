import * as gameModels from "../models/gameModels";

// Basic CRUD

export const createGame = async (
    name: string,
    description: string,
    rewardPoint: number
) => {
    //Caching stuff

    return await gameModels.createGame(name, description, rewardPoint)
}

export const getAllGame = async (page: number, pageSize: number, wasAdmin: boolean = false) => {
    //Caching stuff

    return await gameModels.fetchAllGame(page, pageSize, wasAdmin)
}

export const getGameByKeyword = async (searchTerm: string, page: number, pageSize: number, wasAdmin: boolean = false) => {
    //caching stuff

    return await gameModels.fetchGameByKeyword(searchTerm, page, pageSize, wasAdmin)
}

export const updateGame = async (id: string, data: Partial<{
    name: string,
    description: string,
    rewardPoint: number,
    deleted: boolean
}>) => {
    //caching stuff
    return await gameModels.updateGame(id, data)
}

export const restoreGame = async (id: string) => {
    //caching stuff
    return await gameModels.updateGame(id, {
        deleted: false
    })
}

export const removeGame = async (id: string) => {
    //caching stuff
    return await gameModels.softDeleteGame(id)
}