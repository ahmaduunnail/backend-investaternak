import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as articleService from '../services/articleService';
import { createResponse } from '../middlewares/utils';
import { paginationNumber } from '../middlewares/const';

export const createArticle = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(createResponse(
            false,
            null,
            "Input error",
            errors.array()
        ));
    }

    const { title, content, recomendedFor } = req.body

    const data = await articleService.createArticle(title, content, recomendedFor);
    res.status(200).json(createResponse(
        true,
        data,
        "Article successfully created"
    ));
};

export const getArticles = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(createResponse(
            false,
            null,
            "Input error",
            errors.array()
        ));
    }

    const { q, recomendedFor, id, page = 1, pageSize = paginationNumber } = req.query

    let data: any;

    if (q) {
        data = await articleService.getArticleByKeyword(q as string, page as number, pageSize as number, false);
    } else if (recomendedFor) {
        data = await articleService.getAllArticleByRecomendedFor(recomendedFor as string, page as number, pageSize as number);
    } else if (id) {
        data = await articleService.getArticleById(id as string, true);
    } else {
        data = await articleService.getAllArticle(page as number, pageSize as number);
    }

    res.status(data ? 200 : 404).json(createResponse(
        true,
        data.totalArticles == 0 ? {} : data,
        data.totalArticles == 0 ? "Data was not found" : ""
    ));
};

export const updateArticle = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(createResponse(
            false,
            null,
            "Input error",
            errors.array()
        ));
    }

    const { id } = req.query

    const data = await articleService.updateArticle(id as string, req.body)

    res.status(200).json(createResponse(
        true,
        data,
        "Data succesfully updated"
    ))
};

export const deleteArticle = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(createResponse(
            false,
            null,
            "Input error",
            errors.array()
        ));
    }

    const { id } = req.query

    const data = await articleService.removeArticle(id as string)

    res.status(200).json(createResponse(
        true,
        data,
        "Data succesfully deleted"
    ))
};

export const restoreDelete = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(createResponse(
            false,
            null,
            "Input error",
            errors.array()
        ));
    }

    const { id } = req.query

    const data = await articleService.restoreArticle(id as string)

    res.status(200).json(createResponse(
        true,
        data,
        "Data succesfully restored"
    ))
};

export const likeDisklikeArticle = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(createResponse(
            false,
            null,
            "Input error",
            errors.array()
        ));
    }

    const { id, userId } = req.query

    const data = await articleService.likeAndDislikeArticle(userId as string, id as string)

    res.status(200).json(createResponse(
        true,
        data,
        "Actions succesfuly completed"
    ))
};