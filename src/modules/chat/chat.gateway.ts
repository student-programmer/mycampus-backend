import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private users: Map<string, string> = new Map(); // { userId: socketId }

  constructor(private readonly chatService: ChatService) {
  }

  // 📌 Подключение пользователя
  async handleConnection(client: Socket) {
    const userId = this.getUserId(client);
    if (!userId) return;
    console.log(`User ${ userId } connected with socket ${ client.id }`);
    this.users.set(String(userId), client.id);
    await this.chatService.updateUserStatus(userId, true);
    this.server.emit('userStatus', { userId, isOnline: true });
  }

  // 📌 Отключение пользователя
  async handleDisconnect(client: Socket) {
    const userId = this.getUserId(client);
    if (!userId) return;

    console.log(`User ${ userId } disconnected`);
    this.users.delete(String(userId));
    await this.chatService.updateUserStatus(userId, false);
    this.server.emit('userStatus', { userId, isOnline: false });
  }

  // 📌 Получаем userId из запроса
  private getUserId(client: Socket): number | null {
    const userId = client.handshake.query.userId;
    return Array.isArray(userId) ? Number(userId[0]) : Number(userId) || null;
  }

  // 📌 Отправка личного или группового сообщения
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: { senderId: number; content: string; receiverId?: number },
  ) {
    if (!data.senderId || !data.content) return;
    try {
      const message = await this.chatService.createMessage(
        Number(data.senderId),
        data.content,
        Number(data.receiverId),
      );

      // Отправляем сообщение отправителю, если у него есть сокет
      if (data?.senderId) {
        const senderSocketId = this.users.get(String(data.senderId));
        if (senderSocketId) {
          this.server.to(senderSocketId).emit('message', message);
        }
      }

      // Отправляем сообщение получателю, если receiverId существует
      if (data.receiverId) {
        const receiverSocketId = this.users.get(String(data.receiverId));
        if (receiverSocketId) {
          this.server.to(receiverSocketId).emit('message', message);
        }
      } else {
        this.server.emit('message', message);
      }
    } catch (e) {
      console.log(e);
    }
  }

}
