import express from 'express';
import { body, query } from 'express-validator';
import { getArticles, createArticle } from "../controllers/articleController";

const router = express.Router();

//create article
router.post('/articles', [
    body('title').isString().withMessage("Title is needed"),
    body('content').isString().withMessage("Content is needed"),
    body('recomendedFor').isString().withMessage("Recomended for is needed")
], createArticle)

// Get articles
router.get('/articles', [
    query('q').optional().isString().withMessage('Query is required'),
    query('recomendedFor').optional().isString().withMessage('Recomended For is required'),
    query('id').optional().isString().withMessage(' is required'),

    query('page').optional().isNumeric().withMessage('Page is required'),
    query('pageSizes').optional().isNumeric().withMessage('PageSize Required'),
], getArticles);



export default router;
