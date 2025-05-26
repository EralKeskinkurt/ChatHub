import { Request, Response } from "express";
import { verifyTokens } from "../utils/tokens/authToken";
import messageService from "../services/message.service";
import chatRoomService from "../services/chatRoom.service";

async function sendMessage(req: Request, res: Response) {
    const { access_token } = req.cookies;
    const { message, chatRoomId } = req.body;

    const verifiedToken = verifyTokens(access_token, "access");

    if (typeof verifiedToken !== "object" || !("userId" in verifiedToken)) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    if (!message || !chatRoomId) {
        res.status(400).json({ error: "Message and chat room ID are required" });
        return;
    }

    try {

        const chatRoom = await chatRoomService.getChatRoomById(chatRoomId);


        const isParticipant = chatRoom.participants.some(
            (participant) => participant.user.id === Number(verifiedToken.userId)
        );

        if (!isParticipant) {
            res.status(403).json({ error: "User is not a participant in this chat room" });
            return;
        }

        if (!chatRoom) {
            res.status(404).json({ error: "Chat room not found" });
            return;
        }

        const newMessage = await messageService.createMessage(
            Number(verifiedToken.userId),
            message,
            chatRoom.id
        );

        res.status(201).json(newMessage);



    } catch (error: any) {
        res.status(500).json({ error: error.message || "Failed to send message" });
    }
}

export {
    sendMessage,
}