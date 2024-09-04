import * as articleModels from "../models/articleModels";

// Basic CRUD

export const createArticle = async (title: string, content: string, recomendedFor: string) => {
    return await articleModels.createArticle(title, content, recomendedFor)
}

export const getAllArticle = async (page: number, pageSize: number, wasAdmin: boolean = false) => {
    if (page < 1 || isNaN(page)) {
        page = 1
    }

    if (pageSize < 5 || isNaN(pageSize)) {
        pageSize = 5
    }

    return await articleModels.fetchAllArticle(page, pageSize, wasAdmin)
}

export const getArticleByKeyword = async (searchTerm: string, page: number, pageSize: number, wasAdmin: boolean = false) => {
    if (page < 1 || isNaN(page)) {
        page = 1
    }

    if (pageSize < 5 || isNaN(pageSize)) {
        pageSize = 5
    }

    return await articleModels.fetchArticleByKeyword(searchTerm, page, pageSize, wasAdmin)
}

export const getAllArticleByRecomendedFor = async (recomendedFor: string, page: number, pageSize: number, wasAdmin: boolean = false) => {
    if (page < 1 || isNaN(page)) {
        page = 1
    }

    if (pageSize < 5 || isNaN(pageSize)) {
        pageSize = 5
    }
    
    return await articleModels.fetchArticleByRecomendedFor(recomendedFor, page, pageSize, wasAdmin)
}

export const getArticleById = async (id: string, wasAdmin: boolean = false) => {
    return await articleModels.getArticleById(id, wasAdmin)
}

export const updateArticle = async (id: string, data: Partial<{
    title: string,
    content: string,
    recomendedFor: string,
    like: number,
    deleted: boolean
}>) => {
    return await articleModels.updateArticle(id, data)
}

export const restoreArticle = async (id: string) => {
    return await articleModels.updateArticle(id, {
        deleted: false
    })
}

export const removeArticle = async (id: string) => {
    return await articleModels.softDeleteArticle(id)
}

// Article interactions

export const likeArticle = async (id: string, userId: string) => {
    return await articleModels.likeArticle(id, userId)
}