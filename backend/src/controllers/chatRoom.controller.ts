import { Request, Response } from "express";
import { verifyTokens } from "../utils/tokens/authToken";
import chatRoomService from "../services/chatRoom.service";
import chatRoomParticipantService from "../services/chatRoomParticipant.service";

async function chatRoomCheck(req: Request, res: Response) {
    const { access_token } = req.cookies;
    const { message, chatRoomId, friendIds, roomName } = req.body;

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

        if (chatRoom) {
            res.status(200).json({ message: "Chat room already exists" });
            return;
        }

        const newChatRoom = await chatRoomService.createChatRoom(
            roomName || "New Chat Room",
            false
        );

        const participantsData = [
            ...friendIds.map((friendId: number) => ({
                userId: friendId,
                chatRoomId: newChatRoom.id
            })),
            {
                userId: Number(verifiedToken.userId),
                chatRoomId: newChatRoom.id
            }
        ];

        await chatRoomParticipantService.createChatRoomParticipant(participantsData);

        res.status(201).json({ message: "Chat room created successfully", chatRoom: newChatRoom });

    } catch (error: any) {
        res.status(500).json({ error: error.message || "Failed to creating room" });
    }
}

export {
    chatRoomCheck,
}

