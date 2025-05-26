import type { Notification, NotificationType } from "@prisma/client";
import prisma from "../config/db";

class NotificationService {
    async createNotification(data: {
        userId: number;
        senderId?: number;
        type: string;
        message: string;
    }): Promise<Notification> {
        return await prisma.notification.create({
            data: {
                userId: data.userId,
                senderId: data.senderId,
                type: data.type as any,
                message: data.message,
            },
            include: {
                sender: true,
                user: true
            }
        });
    }


    async getNotificationsByUserId(userId: number): Promise<Notification[]> {
        return await prisma.notification.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async updateNotificationType(notificationId: number, notifiactionType: NotificationType): Promise<Notification> {
        return await prisma.notification.update({
            where: { id: notificationId },
            data: { type: notifiactionType }
        })
    }


    async markAsRead(notificationId: number): Promise<Notification> {
        return await prisma.notification.update({
            where: { id: notificationId },
            data: { isRead: true },
        });
    }

    async markAllAsRead(userId: number): Promise<{ count: number }> {
        return await prisma.notification.updateMany({
            where: {
                userId,
                isRead: false,
            },
            data: {
                isRead: true,
            },
        });
    }
}

export default new NotificationService();