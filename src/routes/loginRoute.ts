import express from 'express';
import * as tokenController from '../controllers/tokenController';
import { body, header } from 'express-validator';

const router = express.Router();

router.post('/login', [
    body('username').isString().trim().toLowerCase().withMessage("Username is needed"),
    body('password').isString().trim().withMessage("password is needed")
], tokenController.login);

router.post('/refresh-token', [
    header('authorization').isString().withMessage("Authorization header is needed")
], tokenController.refresh);

router.post('/logout', [
    header('authorization').isString().withMessage("Authorization header is needed")
], tokenController.logout);

export default router;
