import { Request, Response, NextFunction } from 'express';

interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: any;
}

export const createResponse = <T = any>(
    success: boolean,
    data?: T,
    message?: string,
    errors?: any
): ApiResponse<T> => {
    return { success, data, message, errors };
};

export const asyncWrapper = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const parseDuration = (duration: string): number => {
    const match = duration.match(/^(\d+)([smhd])$/);
    if (!match) {
      throw new Error('Invalid duration format');
    }
    
    const value = parseInt(match[1], 10);
    const unit = match[2];
  
    switch (unit) {
      case 's':
        return value * 1000;
      case 'm':
        return value * 60 * 1000;
      case 'h':
        return value * 60 * 60 * 1000;
      case 'd':
        return value * 24 * 60 * 60 * 1000;
      default:
        throw new Error('Invalid duration unit');
    }
  };