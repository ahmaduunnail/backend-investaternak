import { Request, Response, NextFunction } from 'express';
import { JwtPayloadCustom, verifyToken } from './jwt';
import { Role } from '@prisma/client';
import { createResponse } from './utils';


const authorize = (requiredRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) return res.status(401).json(createResponse(
            false,
            null,
            "Unauthorized"
        )); // Unauthorized if no token is present

        try {
            const { userId, role } = verifyToken(token) as JwtPayloadCustom;

            // Check if the user has one of the required roles
            if (!requiredRoles.includes(role)) {
                return res.status(403).json(createResponse(
                    false,
                    null,
                    "Forbidden"
                )); // Forbidden if the role is not in required roles
            }

            // Optionally attach user info to request object
            req.user = { userId, role };
            next();
        } catch (error) {
            return res.status(401).json(createResponse(
                false,
                null,
                "JWT Expired"
            )); // Unauthorized if no token is present
        }
    };
};

export default authorize;
