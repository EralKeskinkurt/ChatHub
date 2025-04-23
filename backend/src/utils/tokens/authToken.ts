
import jwt from 'jsonwebtoken';

const createAccessToken = (userId: string) => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('ACCESS_TOKEN_SECRET is not defined in environment variables');
    }
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: '15m',
    });
};

const createRefreshToken = (userId: string) => {
    if (!process.env.REFRESH_TOKEN_SECRET) {
        throw new Error('REFRESH_TOKEN_SECRET is not defined in environment variables');
    }
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: '7d',
    });
};

const verifyTokens = (token: string, wichToken: string) => {
    try {
        if (wichToken === 'access') {
            return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        } else if (wichToken === 'refresh') {
            return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
        } else {
            throw new Error('Invalid token type specified');
        }
    }
    catch (_error) {
        if (_error instanceof Error) {
            return _error.message || 'Invalid token';
        }
    }
};

export { createAccessToken, createRefreshToken, verifyTokens };