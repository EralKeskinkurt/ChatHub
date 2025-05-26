interface Notification {
    id: number;
    userId: number;
    senderId: number;
    type: NotificationType;
    message: string;
    isRead: boolean;
    createdAt: Date;
    user: User;
    sender: User;
}

type NotificationType = "FRIEND_BLOCKED" | "FRIEND_REQUEST" | "FRIEND_ACCEPTED" | "MESSAGE" | "CUSTOM"


