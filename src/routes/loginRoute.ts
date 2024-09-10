import express from 'express';
import * as tokenController from '../controllers/tokenController';
import { body, header } from 'express-validator';
import authorize from '../middlewares/authorizations';
import { Role } from '@prisma/client';

const router = express.Router();

router.post('/login', [
    body('username').isString().trim().toLowerCase().withMessage("Username is needed"),
    body('password').isString().trim().withMessage("password is needed")
], tokenController.login);

router.post('/login/refresh', [
    authorize([Role.ADMIN, Role.SUPER, Role.FARMERS, Role.USERS], true),
    header('authorization').isString().withMessage("Authorization header is needed")
], tokenController.refresh);

router.post('/logout', [
    authorize([Role.ADMIN, Role.SUPER, Role.FARMERS, Role.USERS]),
    header('authorization').isString().withMessage("Authorization header is needed")
], tokenController.logout);

export default router;
