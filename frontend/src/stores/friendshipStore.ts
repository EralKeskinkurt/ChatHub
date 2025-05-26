
import { create } from 'zustand';

interface FriendshipStore {
    friendships: Friendship[];
    selectedChatFriend: User | null;
    addFriendship: (friendship: Friendship) => void;
    updateFriendship: (friendship: Friendship) => void;
    setFriendship: (friendships: Friendship[]) => void;
    selectChatFriend: (friendId: number) => void;
}

const useFriendshipStore = create<FriendshipStore>((set) => ({
    friendships: [],
    selectedChatFriend: null,
    addFriendship: (friendship) =>
        set((state) => ({
            friendships: [...state.friendships, friendship],
        })),
    updateFriendship: (friendship) =>
        set((state) => ({
            friendships: state.friendships.map((f, _index) => {
                if (f.id === friendship.id) {
                    f = friendship;
                }
                return f;
            })
        })),
    setFriendship: (friendships) =>
        set(() => ({
            friendships: friendships,
        })),
    selectChatFriend: (friendId: number) =>
        set((state) => ({
            selectedChatFriend: (() => {
                const friendship = state.friendships.find(
                    (f) => f.friend.id === friendId || f.user.id === friendId
                );
                if (!friendship) return null;
                return friendship.friend.id === friendId ? friendship.friend : friendship.user;
            })()
        }))
}));

export default useFriendshipStore;