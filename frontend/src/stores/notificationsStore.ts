import { create } from 'zustand';

interface NotificationStore {
    notifications: Notification[];
    setNotificaitons: (notifications: Notification[]) => void;
    updateNotification: (notification: Notification) => void;
    addNotification: (notification: Notification) => void;
}

const useNotificationStore = create<NotificationStore>((set) => ({
    notifications: [],
    setNotificaitons: (notifications) =>
        set(() => ({
            notifications: notifications,
        })),
    updateNotification: (notification) =>
        set((state) => ({
            notifications: state.notifications.map((n, _index) => {
                if (n.id === notification.id) {
                    n = notification;
                }
                return n;
            })
        })),
    addNotification: (notification) => {
        set((state) => ({
            notifications: [...state.notifications, notification]
        }))
    }
}));

export default useNotificationStore;