import type { Friendship, FriendshipStatus } from "@prisma/client";
import prisma from "../config/db";

class FirendsService {
    async createFriendship(friendId: number, userId: number): Promise<Friendship | null> {
        const friendship = await prisma.friendship.create({
            data: {
                friendId,
                userId,
            },
            include: {
                friend: true
            }
        })

        if (!friendship) {
            throw new Error("Friendship not created");
        }

        return friendship
    }
    async updateFriendshipStatus(userId: number, friendId: number, status: FriendshipStatus): Promise<Friendship> {
        const friendship = await prisma.friendship.findFirst({
            where: {
                OR: [
                    { userId, friendId },
                    { userId: friendId, friendId: userId }
                ]
            }
        });

        if (!friendship) {
            throw new Error("Friendship not found");
        }

        const updated = await prisma.friendship.update({
            where: {
                userId_friendId: {
                    userId: friendship.userId,
                    friendId: friendship.friendId
                }
            },
            data: {
                status
            },
            include: {
                friend: true
            }
        });

        return updated;
    }
    async getFriendships(userId: number): Promise<Friendship[] | []> {

        const friendships = await prisma.friendship.findMany({
            where: {
                OR: [
                    { userId },
                    { friendId: userId }
                ]
            },
            include: {
                friend: true,
                user: true
            },
        })

        const normalized = friendships.map(f => {
            const isUserInitiator = f.userId === userId;

            return {
                ...f,
                friend: isUserInitiator ? f.friend : f.user,
            };
        });

        return normalized
    }

}

export default new FirendsService();