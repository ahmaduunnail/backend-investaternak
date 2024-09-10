import * as profileModels from "../models/profileModels";

// Basic CRUD

export const createProfile = async (
    email: string,
    nik: string,
    address: string,
    job: string,
    userId: string
) => {
    //Caching stuff

    return await profileModels.createProfile(email, nik, address, job, userId)
}

export const getAllProfile = async (page: number, pageSize: number, wasAdmin: boolean = false) => {
    //Caching stuff

    return await profileModels.fetchAllProfile(page, pageSize, wasAdmin)
}

export const getProfileByKeyword = async (searchTerm: string, page: number, pageSize: number, wasAdmin: boolean = false) => {
    //caching stuff

    return await profileModels.fetchProfileByKeyword(searchTerm, page, pageSize, wasAdmin)
}

export const getProfileByEmail = async (email: string) => {
    //caching stuff

    return await profileModels.fetchProfileByEmail(email)
}

export const getProfileByNIK = async (nik: string) => {
    //caching stuff

    return await profileModels.fetchProfileByNIK(nik)
}

export const getProfileById = async (id: string, wasAdmin: boolean = false) => {
    //caching stuff

    return await profileModels.fetchProfileById(id, wasAdmin)
}

export const updateProfile = async (id: string, data: Partial<{
    email: string,
    nik: string,
    address: string,
    job: string,
    deleted: boolean
}>, userId?: string) => {
    //caching stuff
    return await profileModels.updateProfile(id, data, userId)
}

export const restoreProfile = async (id: string) => {
    //caching stuff
    return await profileModels.updateProfile(id, {
        deleted: false
    })
}

export const removeProfile = async (id: string) => {
    //caching stuff
    return await profileModels.softDeleteProfile(id)
}