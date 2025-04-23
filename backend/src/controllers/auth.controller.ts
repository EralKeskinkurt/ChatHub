import { Request, Response } from "express";
import userService from "../services/user.service";
import { loginSchema, registerSchema } from "../validations/authValidations";
import { createAccessToken, createRefreshToken, verifyTokens } from "../utils/tokens/authToken";

async function register(req: Request, res: Response) {
    try {
        const parsedData = registerSchema.parse(req.body);
        const birthDate = new Date(parsedData.birthDate);

        const { tokens, user } = await userService.createUser({
            ...parsedData,
            birthDate,
        });

        const cookieOptions = {
            httpOnly: true,
            secure: false,
            sameSite: "lax" as const
        };

        res
            .cookie("refresh_token", tokens.refresh_token, cookieOptions)
            .cookie("access_token", tokens.access_token, cookieOptions)
            .status(201)
            .json(user);

        return;

    } catch (error: any) {
        res.status(400).json({
            error: error.message || "Something went wrong",
        });
        return
    }
}

async function login(req: Request, res: Response) {
    try {
        const { email, phone, password } = loginSchema.parse(req.body);

        const result = await userService.getUserByEmailOrPhone(password, email, phone);

        if (!result?.user || !result.tokens) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }

        const { user, tokens } = result;

        const cookieOptions = {
            httpOnly: true,
            secure: false,
            sameSite: "lax" as const
        };

        res
            .cookie("refresh_token", tokens.refresh_token, cookieOptions)
            .cookie("access_token", tokens.access_token, cookieOptions)
            .status(201)
            .json(user);

        return;

    } catch (error: any) {
        res.status(400).json({ error: error.message || "Login failed" });
        return
    }
};

async function tokenRefresh(req: Request, res: Response) {
    try {
        const { refresh_token } = req.cookies;

        if (!refresh_token) {
            res.status(401).json({ error: "No refresh token provided" });
            return;
        }

        const userId = verifyTokens(refresh_token, "refresh");

        if (!userId) {
            res.status(401).json({ error: "Invalid refresh token" });
            return;
        }

        const tokens = {
            access_token: createAccessToken(userId.toString()),
            refresh_token: createRefreshToken(userId.toString()),
        }

        await userService.updateUser(Number(userId), {
            refreshToken: tokens.refresh_token,
        });

        const cookieOptions = {
            httpOnly: true,
            secure: false,
            sameSite: "lax" as const
        };

        res
            .cookie("refresh_token", tokens.refresh_token, cookieOptions)
            .cookie("access_token", tokens.access_token, cookieOptions)
            .status(200)
            .json({ message: "Tokens refreshed successfully" });

    } catch (error: any) {
        res.status(400).json({ error: error.message || "Token refresh failed" });
    }
}


async function me(req: Request, res: Response) {
    try {
        const { access_token } = req.cookies;

        if (!access_token) {
            res.status(401).json({ error: "No access token provided" });
            return;
        }

        const verifiedToken = verifyTokens(access_token, "access");

        if (!verifiedToken) {
            res.status(401).json({ error: "Invalid access token" });
            return;
        }

        if (typeof verifiedToken !== "object" || !("userId" in verifiedToken)) {
            res.status(401).json({ error: "Invalid access token" });
            return;
        }

        const user = await userService.getUserById(Number(verifiedToken.userId));

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.status(200).json(user);
        return
    }
    catch (error: any) {
        res.status(400).json({ error: error.message || "Something went wrong" });
        return;
    }
}

export {
    register,
    login,
    tokenRefresh,
    me
};
