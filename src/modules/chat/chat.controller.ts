import {
    Controller,
    Get,
    HttpStatus, Param,
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

import {LoggerService} from '../common';
import {ChatService} from './chat.service';
import { Message, User } from "@prisma/client";

@Controller('chat')
@ApiTags('Chat')
export class ChatController {
    public constructor(

        private readonly logger: LoggerService,
        private readonly ChatService: ChatService, // исправлено название переменной
    ) {
    }

    @Get('users/:id')
    @ApiOperation({summary: 'Get all universities'})
    @ApiResponse({status: HttpStatus.OK})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getChatUsers(@Param('id') id: string): Promise<User[]> {

        const users: User[] = await this.ChatService.getUserChats(Number(id));

        this.logger.info(`Got ${users.length} users`);

        return users;
    }

    @Get(':userId1/:userId2')
    @ApiOperation({summary: 'Get all universities'})
    @ApiResponse({status: HttpStatus.OK})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getChatMessages(@Param('userId1') userId1: string, @Param('userId2') userId2: string): Promise<Message[]> {

        const messages: Message[] = await this.ChatService.getPrivateMessages(Number(userId1), Number(userId2));

        this.logger.info(`Got ${messages.length} messages`);

        return messages;
    }
}
