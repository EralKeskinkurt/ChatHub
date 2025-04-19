import { createHash } from "crypto";
import prisma from "../config/db";
import type { User } from "@prisma/client";
import { createAccessToken, createRefreshToken } from "../utils/token/authToken";

class UserService {

    async getUserById(id: number): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { id },
        });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { email },
        });
    }

    async createUser(data: Omit<User, "createdAt" | "refreshToken" | "id" | "updatedAt">): Promise<{ user: User; tokens: { access_token: string; refresh_token: string } }> {
        const { password, email, phone, ...userData } = data;

        const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
        if (existingUser) throw new Error("Email is already registered");

        const existingPhone = await prisma.user.findUnique({ where: { phone: data.phone } });
        if (existingPhone) throw new Error("Phone is already registered");

        const hashedPassword = createHash("sha256")
            .update(password)
            .digest("hex");

        const user = await prisma.user.create({
            data: {
                ...userData,
                email,
                phone,
                password: String(hashedPassword),
            },
        });

        const tokens = {
            access_token: createAccessToken(user.id.toString()),
            refresh_token: createRefreshToken(user.id.toString())
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                refreshToken: tokens.refresh_token,
            },
        });

        return {
            user,
            tokens
        };
    }

    async updateUser(id: number, data: Partial<User>): Promise<User> {
        return await prisma.user.update({
            where: { id },
            data,
        });
    }
}

export default new UserService();