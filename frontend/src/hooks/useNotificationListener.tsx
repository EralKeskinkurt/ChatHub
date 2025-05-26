import { useEffect } from "react";
import { socket } from "@/hooks/useSocket";
import useNotificationStore from "@/stores/notificationsStore";
import useFriendshipStore from "@/stores/friendshipStore";

export default function UseNotificationListener() {
  const { addNotification, updateNotification } =
    useNotificationStore.getState();
  const { addFriendship, updateFriendship } = useFriendshipStore.getState();

  useEffect(() => {
    socket.on("new_notification", (data) => {
      console.log("New notification:", data);
      addNotification(data.notification);
      addFriendship(data.friendship);
    });

    socket.on("update_notification", (data) => {
      console.log("update_notification : ", data);
      updateFriendship(data.friendship);
      updateNotification(data.notification);
    });

    return () => {
      socket.off("new_notification");
    };
  }, []);

  return null;
}
