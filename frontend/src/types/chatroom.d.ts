type ChatRole = "MEMBER" | "ADMIN" | "OWNER";
interface ChatRoomParticipant {
    id: number;
    userId: number;
    chatRoomId: number;
    role: ChatRole;
    joinedAt: Date;
    isMuted: boolean;

}

interface ChatRoom {
    id: number;
    name?: string;
    isGroup: boolean;
    createdAt: Date;
    participants: ChatRoomParticipant[];

}
