import { generateToken, verifyToken } from "../utils/jwt";
import { TokenError, } from "fast-jwt";
import { parseDuration } from "../utils/utils";
import { saveToken, deleteTokensByUserId, deleteToken, findToken } from "../models/tokenModels";
import { fetchUserByUsername } from "../models/userModels";

export const login = async (username: string, password: string) => {
    const user = await fetchUserByUsername(username, true);

    if (!user) return "user_not_found";

    if (user.password !== password) return "wrong_password";

    const accessToken = await generateToken(user.id, user.role);
    const refreshToken = await generateToken(user.id, user.role, true);

    const accessTokenExpiry = process.env.JWT_EXPIRES_IN;
    const refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRES_IN;

    if (!accessTokenExpiry || !refreshTokenExpiry) throw 'Token expiration times not set'

    await deleteTokensByUserId(user.id); // Optionally clear old tokens
    await saveToken(user.id, refreshToken, new Date(Date.now() + parseDuration(refreshTokenExpiry)));

    return {
        accessToken,
        refreshToken
    }
}

export const logout = async (refreshToken: string) => {
    const tokenRecord = await findToken(refreshToken)

    if (!tokenRecord) return "token_not_found";

    await deleteToken(refreshToken);

    return "succesfully_delete_token"
}

export const refresh = async (refreshToken: string) => {
    const tokenRecord = await findToken(refreshToken);

    if (!tokenRecord) return "token_not_found"

    try {
        await verifyToken(refreshToken, true);
        const newAccessToken = await generateToken(tokenRecord.userId, tokenRecord.user.role);
        return newAccessToken;
    } catch (err) {
        if (err instanceof TokenError && err.code == TokenError.codes.expired) {
            return "Access Token is expired, do a refresh token"
        }
        return `Embuh mas. ${err as string}`

    }
}