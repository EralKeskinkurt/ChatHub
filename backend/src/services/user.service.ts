import { compareHash, createHash } from "../utils/crypt";
import prisma from "../config/db";
import type { User } from "@prisma/client";
import { createAccessToken, createRefreshToken } from "../utils/tokens/authToken";

class UserService {
    async getUserById(id: number): Promise<Omit<User, "password" | "refreshToken">> {
        const userRecord = await prisma.user.findUnique({
            where: { id },
        });

        if (!userRecord) {
            throw new Error("User not found");
        }

        const { password: _p, refreshToken: _r, ...user } = userRecord;

        return user
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { email },
        });
    }

    async getUserByPhone(phone: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { phone },
        });
    }

    async getUserByEmailOrPhone(
        password: string,
        email?: string,
        phone?: string
    ): Promise<{
        user: Omit<User, "password" | "refreshToken">;
        tokens: { access_token: string; refresh_token: string };
    } | null> {

        if (!email && !phone) {
            throw new Error("Either email or phone number is required");
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { phone }],
            },
        });

        if (!existingUser) {
            throw new Error("User not found");
        }

        const isPasswordValid = await compareHash(password, existingUser.password);

        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const tokens = {
            access_token: createAccessToken(existingUser.id.toString()),
            refresh_token: createRefreshToken(existingUser.id.toString()),
        };

        await this.updateUser(existingUser.id, {
            refreshToken: tokens.refresh_token,
        });

        const { password: _pw, refreshToken: _rt, ...sanitizedUser } = existingUser;

        return { user: sanitizedUser, tokens };
    };

    async createUser(
        data: Omit<User, "createdAt" | "refreshToken" | "id" | "updatedAt" | "status" | "lastSeen" | "imageUrl" | "bio">
    ): Promise<{
        user: Omit<User, "password" | "refreshToken">;
        tokens: { access_token: string; refresh_token: string };
    }> {
        const { password, email, phone, ...userData } = data;

        const [existingUser, existingPhone] = await Promise.all([
            prisma.user.findUnique({ where: { email } }),
            prisma.user.findUnique({ where: { phone } }),
        ]);

        if (existingUser) throw new Error("Email is already registered");
        if (existingPhone) throw new Error("Phone is already registered");

        const hashedPassword = await createHash(password);

        const createdUser = await prisma.user.create({
            data: {
                ...userData,
                email,
                phone,
                password: hashedPassword,
            },
        });

        const tokens = {
            access_token: createAccessToken(createdUser.id.toString()),
            refresh_token: createRefreshToken(createdUser.id.toString()),
        };

        await this.updateUser(createdUser.id, {
            refreshToken: tokens.refresh_token,
        });

        const { password: _pw, refreshToken: _rt, ...sanitizedUser } = createdUser;

        return {
            user: sanitizedUser,
            tokens,
        };
    }

    public async updateUser(id: number, data: Partial<User>): Promise<User> {
        try {
            if (!Object.keys(data).length) {
                throw new Error("No data provided for update");
            }

            return await prisma.user.update({
                where: { id },
                data,
            });
        } catch (error) {

            if (error instanceof Error) {
                console.error("Error updating user:", error.message);
            } else {
                console.error("Error updating user:", error);
            }
            throw error;
        }
    }
}

export default new UserService();