import prisma from "../config/db";

/** model ChatRoom {
  id           Int                   @id @default(autoincrement())
  name         String?
  isGroup      Boolean               @default(false)
  createdAt    DateTime              @default(now())
  participants ChatRoomParticipant[]
  messages     Message[]
} */

class ChatRoomService {
    async createChatRoom(name: string, isGroup: boolean) {
        return await prisma.chatRoom.create({
            data: {
                name,
                isGroup: isGroup ? true : false,
            },
        });
    }

    async getChatRoomById(id: number) {
        const chatRoomRecord = await prisma.chatRoom.findUnique({
            where: { id },
            include: {
                participants: {
                    include: {
                        user: true,
                    },
                },
                messages: true,
            },
        });

        if (!chatRoomRecord) {
            throw new Error("Chat room not found");
        }

        return chatRoomRecord;
    }

    async getChatRoomsByUserId(userId: number) {
        return await prisma.chatRoom.findMany({
            where: {
                participants: {
                    some: {
                        userId,
                    },
                },
            },
        });
    }
}

export default new ChatRoomService();