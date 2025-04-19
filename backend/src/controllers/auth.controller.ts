import userService from "../services/user.service";
import { registerSchema } from "../validations/authValidations";
import { Request, Response } from "express";
export async function register(req: Request, res: Response) {
    try {
        const { birthDate, ...data } = registerSchema.parse(req.body);

        const date = new Date(birthDate);

        const user = await userService.createUser({
            ...data,
            birthDate: date,
        });

        res.cookie("refresh_token", user.tokens.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.cookie("access_token", user.tokens.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(201).json(user);
        return
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Something wrong" });
        return
    }
};

