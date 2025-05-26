import prisma from "../config/db";

/** model Message {
  id        Int      @id @default(autoincrement())
  content   String
  createdAt DateTime @default(now())
  isRead    Boolean  @default(false)
  isEdited  Boolean  @default(false)
  isDeleted Boolean  @default(false)

  sender          User              @relation(fields: [senderId], references: [id])
  senderId        Int
  type            MessageType       @default(TEXT)
  mediaUrl        String?
  chatRoom        ChatRoom          @relation(fields: [chatRoomId], references: [id])
  chatRoomId      Int
  MessageReaction MessageReaction[]
} */

class MessageService {

    async createMessage(senderId: number, content: string, chatRoomId: number) {
        return await prisma.message.create({
            data: {
                senderId,
                content,
                chatRoomId
            },
        });
    }

    async getMessageById(id: number) {
        const messageRecord = await prisma.message.findUnique({
            where: { id },
        });

        if (!messageRecord) {
            throw new Error("Message not found");
        }

        return messageRecord;
    }

    async getMessagesByUserId(senderId: number) {
        return await prisma.message.findMany({
            where: { senderId },
        });
    }


}

export default new MessageService();