"use client";

import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@/stores/authStore";
import { useEffect } from "react";
import chatHubApi from "@/lib/axios";
import useFriendsStore from "@/stores/friendshipStore";

export default function FriendshipProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setFriendship } = useFriendsStore();
  const user = useAuthStore((state) => state.user);

  const { data, error } = useQuery<Friendship[], Error>({
    queryKey: ["/friendship/get-all-friendships"],

    queryFn: async () => {
      if (!user) {
        throw new Error("User not found");
      }

      const response = await chatHubApi.get("/friendship/get-all-friendships");

      if (!response.data) {
        throw new Error("No data found");
      }

      return response.data;
    },
  });

  useEffect(() => {
    if (data) {
      setFriendship(data);
    } else if (error) {
      return;
    }
  }, [data, error, setFriendship]);
  return <>{children}</>;
}
