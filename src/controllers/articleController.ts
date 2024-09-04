import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as articleService from '../services/articleService';

export const createArticle = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }

    const { title, content, recomendedFor } = req.body

    const data = await articleService.createArticle(title, content, recomendedFor);
    res.json(data);
};

export const getArticles = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }

    const { q, recomendedFor, id, page, pageSizes } = req.query

    let data;

    if (q) {
        data = await articleService.getArticleByKeyword(String(q), Number(page), Number(pageSizes));
    } else if (recomendedFor) {
        data = await articleService.getAllArticleByRecomendedFor(String(recomendedFor), Number(page), Number(pageSizes));
    } else if (id) {
        data = await articleService.getArticleById(String(id), true);
    } else {
        data = await articleService.getAllArticle(Number(page), Number(pageSizes));
    }

    res.json(data);
};