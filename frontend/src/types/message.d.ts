enum MessageType {
    TEXT = "TEXT",
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    FILE = "FILE",
    SYSTEM = "SYSTEM",
}

interface MessageReaction {
    id: number;
    messageId: number;
    userId: number;
    emoji: string;
    reactedAt: string; // ISO date string
}

interface Message {
    id: number;
    content: string;
    createdAt: string; // ISO date string
    isRead: boolean;
    isEdited: boolean;
    isDeleted: boolean;
    senderId: number;
    type: MessageType;
    mediaUrl?: string | null;
    chatRoomId: number;
    MessageReaction: MessageReaction[];
}