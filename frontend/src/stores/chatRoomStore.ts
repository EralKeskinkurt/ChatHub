import { create } from "zustand";

interface ChatRoomStoreType {
    chatRoom: ChatRoom | null;
    messages: Message[] | [];
    setChatRoom: (chatRoom: ChatRoom) => void;
    setMessages: (message: Message[]) => void;
    addMessage: (message: Message) => void;
}

const chatRoomStore = create<ChatRoomStoreType>((set) => ({
    chatRoom: null,
    messages: [],
    setChatRoom: (chatRoom) => set({ chatRoom }),
    setMessages: (messages) => set({ messages }),
    addMessage: (message) => set((state) => ({
        messages: [...state.messages, message],
    })),
}));

export default chatRoomStore;
