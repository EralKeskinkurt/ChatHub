import { Request, Response } from "express";
import { verifyTokens } from "../utils/tokens/authToken";
import notificationService from "../services/notification.service";
import userService from "../services/user.service";
import { getSocketId, io } from "../socket/socketServer";
import firendsService from "../services/firends.service";



async function sendFriendRequest(req: Request, res: Response) {
    try {
        const { phone } = req.body;
        const { access_token } = req.cookies;

        if (!phone) {
            res.status(400).json({ error: "Phone number required" });
            return
        }

        if (!access_token) {
            res.status(400).json({ error: "Invalid access token" });
            return
        }

        const user = await userService.getUserByPhone(phone);

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return
        }

        const senderId = verifyTokens(access_token, "access");

        if (typeof senderId !== "object" || !("userId" in senderId)) {
            res.status(401).json({ error: "Unauthorized" });
            return
        }

        const sender = await userService.getUserById(Number(senderId.userId));

        if (!sender) {
            res.status(404).json({ error: "Sender not found" });
            return
        }

        const notification = await notificationService.createNotification({
            userId: user.id,
            senderId: sender.id,
            type: "FRIEND_REQUEST",
            message: `${sender.name} wants to add you as a friend.`,
        });

        const friendship = await firendsService.createFriendship(user.id, sender.id)

        const friendSocketId = getSocketId(user.id.toString());

        const data = {
            friendship,
            notification
        }

        if (friendSocketId) {

            io.to(friendSocketId).emit("new_notification", data);
        }

        res.status(201).json({ message: "Friend request sent" });
        return
    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ error: "Internal server error" });
        return
    }
}

async function getAllNotification(req: Request, res: Response) {
    try {
        const { access_token } = req.cookies

        if (!access_token) {
            res.status(400).json({ error: "Invalid access token" });
            return
        }

        const verifiedToken = verifyTokens(access_token, "access")

        if (typeof verifiedToken !== "object" || !("userId" in verifiedToken)) {
            res.status(401).json({ error: "Unauthorized" });
            return
        }

        const notifications = await notificationService.getNotificationsByUserId(Number(verifiedToken.userId))

        if (notifications.length <= 0) {
            res.status(201).json({ error: "You have not any notification" });
            return
        }

        res.status(201).json(notifications);

    } catch (_error) {
        res.status(500).json({ error: "Internal server error" });
        return
    }

}

export {
    sendFriendRequest,
    getAllNotification
}