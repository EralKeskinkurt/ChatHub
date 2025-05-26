import { Request, Response } from "express";
import { verifyTokens } from "../utils/tokens/authToken";
import firendsService from "../services/firends.service";
import notificationService from "../services/notification.service";
import { getSocketId, io } from "../socket/socketServer";
async function updateFriendshipStatus(req: Request, res: Response) {
    try {
        const { access_token } = req.cookies
        const response = req.body

        if (!access_token) {
            res.status(400).json({ error: "Invalid access token" });
            return
        }

        const verifiedToken = verifyTokens(access_token, "access")

        if (typeof verifiedToken !== "object" || !("userId" in verifiedToken)) {
            res.status(401).json({ error: "Unauthorized" });
            return
        }

        const friendship = await firendsService.updateFriendshipStatus(response.senderId, Number(verifiedToken.userId), response.status)

        const notification = await notificationService.updateNotificationType(response.notificationId, response.status === "ACCEPTED" ? "FRIEND_ACCEPTED" : "FRIEND_BLOCKED");

        const data = {
            friendship,
            notification
        }

        const friendSocketId = getSocketId(response.id);

        if (friendSocketId) {

            io.to(friendSocketId).emit("update_notification", data);
        }

        res.status(201).json({ message: "Friend request accepted" });
        return;
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Failed to add friend" });
        return;
    }
}

async function getAllFriendships(req: Request, res: Response) {
    try {
        const { access_token } = req.cookies

        const verifiedToken = verifyTokens(access_token, "access")

        if (typeof verifiedToken !== "object" || !("userId" in verifiedToken)) {
            res.status(401).json({ error: "Unauthorized" });
            return
        }

        const friendships = await firendsService.getFriendships(Number(verifiedToken.userId))

        if (friendships.length === 0) {
            res.status(201).json([]);
            return
        }

        res.status(201).json(friendships);

    } catch (error: any) {
        res.status(400).json({ error: error.message || "Failed get all friend" });
        return;
    }
}

export {
    updateFriendshipStatus,
    getAllFriendships
}