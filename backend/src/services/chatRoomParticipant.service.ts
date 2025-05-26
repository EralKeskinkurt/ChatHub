import prisma from "../config/db";

/** model ChatRoomParticipant {
  id     Int  @id @default(autoincrement())
  user   User @relation(fields: [userId], references: [id])
  userId Int

  chatRoom   ChatRoom @relation(fields: [chatRoomId], references: [id])
  chatRoomId Int
  role       ChatRole @default(MEMBER)
  joinedAt   DateTime @default(now())
  isMuted    Boolean  @default(false)

  @@unique([userId, chatRoomId])
}
 */

class ChatRoomParticipantService {
    async createChatRoomParticipant(data: { userId: number, chatRoomId: number }[]) {
        return await prisma.chatRoomParticipant.createMany({
            data,
            skipDuplicates: true
        });
    }

    async getChatRoomParticipantById(id: number) {
        const participantRecord = await prisma.chatRoomParticipant.findUnique({
            where: { id },
        });

        if (!participantRecord) {
            throw new Error("Chat room participant not found");
        }

        return participantRecord;
    }

    async getChatRoomParticipantsByUserId(userId: number) {
        return await prisma.chatRoomParticipant.findMany({
            where: { userId },
        });
    }
}

export default new ChatRoomParticipantService();