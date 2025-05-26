import chatHubApi from "@/lib/axios";
import useNotificationStore from "@/stores/notificationsStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function UserNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = useNotificationStore((state) => state.notifications);
  const setNotifications = useNotificationStore(
    (state) => state.setNotificaitons
  );

  const {
    data,
    isLoading: _l,
    error,
  } = useQuery<Notification[], Error>({
    queryKey: ["/notification/get-all"],
  });

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      !(
        e.target instanceof Element && e.target.closest(".notification-popup")
      ) &&
      !(e.target instanceof Element && e.target.closest(".notification-icon"))
    ) {
      setIsOpen(false);
    }
  };

  const { mutate, isPending: _i } = useMutation({
    mutationFn: async (values: {
      senderId: number;
      notificationId: number;
      status: "ACCEPTED" | "BLOCKED";
    }) => {
      if (values) {
        const response = await chatHubApi.post(
          "/friendship/update-request-friendship",
          {
            notificationId: values.notificationId,
            senderId: values.senderId,
            status: values.status,
          }
        );
        return response;
      } else {
        return null;
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const _deleteNotification = () => {};

  useEffect(() => {
    if (data?.length !== undefined && data.length >= 0) {
      setNotifications(data);
    }
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, data, error, _l, notifications, setNotifications]);

  return (
    <div className="relative">
      <Icon
        onClick={() => setIsOpen((prev) => !prev)}
        icon="mingcute:notification-fill"
        width={20}
        height={20}
        className="cursor-pointer notification-icon"
      />
      {notifications.length > 0 && (
        <span className="w-1.5 h-1.5 bg-theme-yellow absolute top-0 right-[0.5px] rounded-full"></span>
      )}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute top-7 left-0 z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="notification-popup"
            >
              <ul className="w-96 min-h-10 flex flex-col items-start justify-start dark:bg-theme-dark shadow-sm dark:shadow-theme-light/50 p-2 rounded-md overflow-hidden">
                {notifications.length === 0 ? (
                  <li className="text-sm w-full bg-theme-gray-dark/70 dark:text-theme-light/80 p-1 rounded-md text-center">
                    There are currently no notifications to show
                  </li>
                ) : (
                  notifications.map((notification, index) => (
                    <li
                      key={index}
                      className={`text-xs w-full flex items-center ${
                        notification.type === "FRIEND_BLOCKED"
                          ? "bg-red-500/20"
                          : "bg-theme-gray-dark/70"
                      } dark:text-theme-light/80 px-3 py-2 gap-3 rounded-md`}
                    >
                      <Icon
                        icon={
                          notification.type === "FRIEND_REQUEST"
                            ? "mdi:account-plus"
                            : "mingcute:notification-fill"
                        }
                        width={20}
                        height={20}
                        className="text-theme-light"
                      />

                      <div className="flex-1">
                        <p>{notification.message}</p>
                        <p>{notification.createdAt.toLocaleString()}</p>
                      </div>
                      <div
                        className={`items-center gap-3 ${
                          notification.type === "FRIEND_REQUEST"
                            ? "flex"
                            : "hidden"
                        }`}
                      >
                        <Icon
                          onClick={() =>
                            mutate({
                              notificationId: notification.id,
                              senderId: notification?.senderId,
                              status: "ACCEPTED",
                            })
                          }
                          icon="fa:plus"
                          width={14}
                          height={14}
                          className="text-green-500/80 hover:text-green-500 cursor-pointer"
                        />
                        <Icon
                          onClick={() =>
                            mutate({
                              notificationId: notification.id,
                              senderId: notification?.senderId,
                              status: "BLOCKED",
                            })
                          }
                          icon="fa:close"
                          width={14}
                          height={14}
                          className="text-red-500/80 hover:text-red-500 cursor-pointer"
                        />
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
