import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createResponse } from "../utils/utils";
import * as tokenService from "../services/tokenService"

export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(createResponse(
            false,
            null,
            "Input error",
            errors.array()
        ));
    }

    const { username, password } = req.body

    const data: any = await tokenService.login(username, password);

    switch (data) {
        case "user_not_found":
            return res.status(404).json(createResponse(
                false,
                null,
                "User is not found"
            ))

        case "wrong_password":
            return res.status(401).json(createResponse(
                false,
                null,
                "Wrong password"
            ))

        default:
            return res.status(200).json(createResponse(
                true,
                data,
                "Succesfully logged in"
            ))
    }
};

export const logout = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(createResponse(
            false,
            null,
            "Input error",
            errors.array()
        ));
    }

    const { authorization } = req.headers
    const refreshToken = authorization?.split(' ')[1];

    const logout = await tokenService.logout(refreshToken as string);

    if (logout == "token_not_found") return res.status(403).json(createResponse(
        false,
        null,
        "Token was not found"
    ));
    else {
        return res.status(204).json(createResponse(
            false,
            null,
            "Succesfully logged out"
        ));
    }
}

export const refresh = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(createResponse(
            false,
            null,
            "Input error",
            errors.array()
        ));
    }

    const { authorization } = req.headers
    const refreshToken = authorization?.split(' ')[1];

    const accessToken = await tokenService.refresh(refreshToken as string);

    switch (accessToken) {
        case "token_not_found":
            return res.status(403).json(createResponse(
                false,
                null,
                "Token wasn't expired or not found in ours"
            ));

        case "forbidden":
            return res.status(403).json(createResponse(
                false,
                null,
                "Idk what did you do"
            ));

        default:
            return res.status(200).json(createResponse(
                false,
                {
                    refreshToken,
                    accessToken
                },
                "Succesfully refresh token"
            ));
    }
}