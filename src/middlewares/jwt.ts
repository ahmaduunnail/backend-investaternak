import { createSigner, createVerifier } from 'fast-jwt';
import { Role } from '@prisma/client';

export interface JwtPayloadCustom {
  userId: string;
  role: Role
}

export const generateToken = (userId: string, role: Role, isRefreshToken: boolean = false): string => {
  const secret = isRefreshToken ? process.env.JWT_REFRESH_SECRET : process.env.JWT_SECRET;
  const expiresIn = isRefreshToken ? process.env.JWT_REFRESH_EXPIRES_IN : process.env.JWT_EXPIRES_IN;

  if (!secret || !expiresIn) {
    throw new Error('JWT secret or expiration time not set');
  }

  // return jwt({ userId, role }, secret, { expiresIn });
  const signSync = createSigner({ key: secret, expiresIn })
  return signSync({ userId, role })
};

export const verifyToken = (token: string, isRefreshToken: boolean = false): JwtPayloadCustom => {
  const secret = isRefreshToken ? process.env.JWT_REFRESH_SECRET : process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT secret not set');
  }
  
  const verifySync = createVerifier({ key: secret })
  
  return verifySync(token) as JwtPayloadCustom;
};
