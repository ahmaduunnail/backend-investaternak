import express from 'express';
import { body, query } from 'express-validator';
import * as articleController from "../controllers/articleController";
import { paginationNumber, RecomendedForArticleEnum } from '../middlewares/const';
import authorize from '../middlewares/authorizations';
import { Role } from '@prisma/client';


const router = express.Router();

//Create data
router.post('/', [
    authorize([Role.ADMIN, Role.SUPER]),
    body('title').isString().trim().withMessage("Title is needed"),
    body('content').isString().trim().withMessage("Content is needed"),
    body('recomendedFor').isIn(Object.values(RecomendedForArticleEnum)).trim().withMessage(`Recomended for is needed, option are ${Object.values(RecomendedForArticleEnum).join(', ')}`)
], articleController.createArticle)

// Get data
router.get('/', [
    authorize([Role.ADMIN, Role.SUPER, Role.FARMERS, Role.USERS]),
    query('q').optional().isString().trim().withMessage('Query should be a string'),
    query('recomendedFor').optional().isIn(Object.values(RecomendedForArticleEnum)).trim().withMessage(`Recomended for option are ${Object.values(RecomendedForArticleEnum).join(', ')}`),
    query('id').optional().isString().trim().withMessage('Id should be a string'),

    query('page').optional().isNumeric().withMessage('Page should be a numberic').isInt({ min: 1 }).withMessage("Minimum 1").toInt(),
    query('pageSize').optional().isNumeric().withMessage('PageSize should be a numeric').isInt({ min: paginationNumber }).withMessage(`Minimum ${paginationNumber}`).toInt(),
], articleController.getArticles);

// Update data
router.put('/', [
    authorize([Role.ADMIN, Role.SUPER]),
    query('id').isString().trim().withMessage("Id is required"),
    body('title').optional().isString().trim().withMessage("Title should be a string"),
    body('content').optional().isString().trim().withMessage("Content should be a string"),
    body('recomendedFor').isIn(Object.values(RecomendedForArticleEnum)).trim().withMessage(`Recomended option are ${Object.values(RecomendedForArticleEnum).join(', ')}`)
], articleController.updateArticle)

//Delete data
router.delete('/', [
    authorize([Role.ADMIN, Role.SUPER]),
    query('id').isString().trim().withMessage("Id is required")
], articleController.deleteArticle)

// Like article
router.post('/like', [
    authorize([Role.FARMERS, Role.USERS]),
    query('id').isString().trim().withMessage("Id is required")
], articleController.likeDisklikeArticle)

export default router;
