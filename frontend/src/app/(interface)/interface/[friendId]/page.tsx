"use client";
import ChatBox from "@/components/interface/ChatBox";
import { use, useEffect } from "react";
import useFriendshipStore from "@/stores/friendshipStore";
export default function Page({
  params,
}: {
  params: Promise<{ friendId: string }>;
}) {
  const { friendId } = use(params);
  const { selectChatFriend, friendships } = useFriendshipStore();

  useEffect(() => {
    if (friendId && friendships.length > 0) {
      selectChatFriend(Number(friendId));
    }
  }, [friendships]);

  return <ChatBox />;
}
