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

export { createAccessToken, createRefreshToken };