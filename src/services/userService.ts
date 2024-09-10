import { Role } from "@prisma/client";
import * as userModels from "../models/userModels";

// Basic CRUD

export const createUser = async (
    username: string,
    password: string,
    name: string,
    imageProfileUrl: string,
    role: Role) => {
    //Caching stuff

    return await userModels.createUser(
        username,
        password,
        name,
        imageProfileUrl,
        role,
    )
}

export const getAllUser = async (page: number, pageSize: number, wasAdmin: boolean = false) => {
    //Caching stuff

    return await userModels.fetchAllUser(page, pageSize, wasAdmin)
}

export const getUserByKeyword = async (searchTerm: string, page: number, pageSize: number, wasAdmin: boolean = false) => {
    //caching stuff

    return await userModels.fetchUserByKeyword(searchTerm, page, pageSize, wasAdmin)
}

export const getUserByUsername = async (username: string, wasAdmin: boolean = false) => {
    //caching stuff

    return await userModels.fetchUserByUsername(username, wasAdmin)
}

export const getUserById = async (id: string, wasAdmin: boolean = false) => {
    //caching stuff
    return await userModels.fetchUserById(id, wasAdmin)
}

export const updateUser = async (id: string, data: Partial<{
    title: string,
    content: string,
    recomendedFor: string,
    role: Role,
}>) => {
    //caching stuff
    return await userModels.updateUser(id, data)
}

export const restoreUser = async (id: string) => {
    //caching stuff
    return await userModels.updateUser(id, {
        deleted: false
    })
}

export const removeUser = async (id: string) => {
    //caching stuff
    return await userModels.softDeleteUser(id)
}