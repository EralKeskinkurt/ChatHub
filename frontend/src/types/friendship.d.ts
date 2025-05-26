
interface Friendship {
    id: number
    createdAt: string
    updatedAt: string
    userId: number
    friendId: number
    status: FriendshipStatus
    friend: User
    user: User
}

type FriendshipStatus = "PENDING" | "ACCEPTED" | "BLOCKED";

