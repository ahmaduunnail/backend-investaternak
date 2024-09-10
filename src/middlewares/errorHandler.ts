import { Request, Response, NextFunction } from 'express';
import { createResponse } from './utils';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json(createResponse(
        false,
        null,
        "An unexpected error occurred.",
        (process.env.NODE_ENV === 'development' && { stack: err.stack })
    ));
};

export const notFoundHandler = (req: Request, res: Response) => {
    res.status(404).json(createResponse(
        false,
        null,
        "Reosurce not found",
        null
    ));
};