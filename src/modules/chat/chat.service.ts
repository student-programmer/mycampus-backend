import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {
  }

  async getUserChats(userId: number) {
    // Получаем сообщения, где userId является отправителем или получателем
    const messages = await this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ]
      },
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        id: true,
        senderId: true,
        receiverId: true,
        content: true,
        createdAt: true,
      },
    });

    // Создаём список уникальных пользователей с последними сообщениями
    const userMessagesMap = new Map<number, { lastMessage: string; lastMessageTime: Date }>();

    messages.forEach((message) => {
      const otherUserId = message.senderId === userId ? message.receiverId : message.senderId;

      // Проверяем, если это первое сообщение или последнее для пользователя
      let existingUserData = null
      if (otherUserId != null) {
        existingUserData = userMessagesMap.get(otherUserId);
      }
      if (!existingUserData || existingUserData.lastMessageTime < message.createdAt) {
        if (otherUserId != null) {
          userMessagesMap.set(otherUserId, {
            lastMessage: message.content,
            lastMessageTime: message.createdAt,
          });
        }
      }
    });

    // Получаем информацию о пользователях, добавляем последнее сообщение
    const userIds = Array.from(userMessagesMap.keys());
    const users = await this.prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
    });

    // Возвращаем пользователей с последним сообщением
    return users.map((user) => {
      const userMessage = userMessagesMap.get(user.id);
      return {
        ...user,
        lastMessage: userMessage?.lastMessage,
      };
    });
  }

  async updateUserStatus(userId: number, isOnline: boolean) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { isOnline },
    });
  }

  // 📌 Отправить сообщение (групповое или личное)
  async createMessage(senderId: number, content: string, receiverId?: number) {
    return this.prisma.message.create({
      data: {
        senderId,
        content,
        receiverId: receiverId || null, // Если null — сообщение в общий чат
      },
      include: { sender: true, receiver: true },
    });
  }

  // 📌 Получить личные сообщения между двумя пользователями
  async getPrivateMessages(userId1: number, userId2: number) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId1, receiverId: userId2 },
          { senderId: userId2, receiverId: userId1 },
        ],
      },
      orderBy: { createdAt: 'asc' },
    });
  }
}
