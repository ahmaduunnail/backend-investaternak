import * as articleModels from "../models/articleModels";

// Basic CRUD

export const createArticle = async (title: string, content: string, recomendedFor: string) => {
    //Caching stuff

    return await articleModels.createArticle(title, content, recomendedFor)
}

export const getAllArticle = async (page: number, pageSize: number, wasAdmin: boolean = false) => {
    //Caching stuff

    return await articleModels.fetchAllArticle(page, pageSize, wasAdmin)
}

export const getArticleByKeyword = async (searchTerm: string, page: number, pageSize: number, wasAdmin: boolean = false) => {
    //caching stuff

    return await articleModels.fetchArticleByKeyword(searchTerm, page, pageSize, wasAdmin)
}

export const getAllArticleByRecomendedFor = async (recomendedFor: string, page: number, pageSize: number, wasAdmin: boolean = false) => {
    //caching stuff

    return await articleModels.fetchArticleByRecomendedFor(recomendedFor, page, pageSize, wasAdmin)
}

export const getArticleById = async (id: string, wasAdmin: boolean = false) => {
    //caching stuff
    return await articleModels.getArticleById(id, wasAdmin)
}

export const updateArticle = async (id: string, data: Partial<{
    title: string,
    content: string,
    recomendedFor: string
}>) => {
    //caching stuff
    return await articleModels.updateArticle(id, data)
}

export const restoreArticle = async (id: string) => {
    //caching stuff
    return await articleModels.updateArticle(id, {
        deleted: false
    })
}

export const removeArticle = async (id: string) => {
    //caching stuff
    return await articleModels.softDeleteArticle(id)
}

// Article interactions

export const likeAndDislikeArticle = async (id: string, userId: string) => {
    //caching stuff

    const existingLike = await articleModels.findLikedArticle(id, userId);
    let res: boolean;

    if (existingLike) {
        res = await articleModels.dislikeArticle(id, userId);
    } else {
        res = await articleModels.likeArticle(id, userId)
    }

    return res ? "Successfully like article" : "Successfully dislike article"
}