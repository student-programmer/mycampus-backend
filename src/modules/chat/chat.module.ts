import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { CommonModule, PrismaService } from '../common';
import { ChatController } from "./chat.controller";

@Module({
  providers: [ChatGateway, ChatService, PrismaService],
  exports: [ChatService],
  imports: [
    CommonModule,
  ],
  controllers: [
    ChatController
  ],
})
export class ChatModule {}
