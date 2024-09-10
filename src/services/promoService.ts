import * as promoModels from "../models/promoModels";

// Basic CRUD

export const createPromo = async (promoCode: string, discount: number) => {
    //Caching stuff

    return await promoModels.createPromo(promoCode, discount)
}

export const getAllPromo = async (page: number, pageSize: number, wasAdmin: boolean = false) => {
    //Caching stuff

    return await promoModels.fetchAllPromo(page, pageSize, wasAdmin)
}

export const getPromoByKeyword = async (searchTerm: string, page: number, pageSize: number, wasAdmin: boolean = false) => {
    //caching stuff

    return await promoModels.fetchPromoByKeyword(searchTerm, page, pageSize, wasAdmin)
}

export const getAllPromoByDiscount = async (minDisc: number, maxDisc: number, page: number, pageSize: number, wasAdmin: boolean = false) => {
    //caching stuff

    return await promoModels.fetchPromoByDiscount(minDisc, maxDisc, page, pageSize, wasAdmin)
}

export const updatePromo = async (id: string, data: Partial<{
    promoCode: string,
    discount: number,
    deleted: boolean
}>) => {
    //caching stuff
    return await promoModels.updatePromo(id, data)
}

export const restorePromo = async (id: string) => {
    //caching stuff
    return await promoModels.updatePromo(id, {
        deleted: false
    })
}

export const removePromo = async (id: string) => {
    //caching stuff
    return await promoModels.softdeletedPromo(id)
}
