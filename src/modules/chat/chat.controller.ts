import {
    Controller,
    Get,
    HttpStatus, Param,
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

import {LoggerService} from '../common';
import {ChatService} from './chat.service';
import {UserService} from '../user/service';

import { Message, User } from "@prisma/client";
import {DetailUserData} from "../user/model";

@Controller('chat')
@ApiTags('Chat')
export class ChatController {
    public constructor(

        private readonly logger: LoggerService,
        private readonly ChatService: ChatService, // исправлено название переменной
        private readonly UserService: UserService
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
    async getChatMessages(@Param('userId1') userId1: string, @Param('userId2') userId2: string): Promise<{ messages: Message[], receiverPhoto: string | undefined }> {

        const messages: Message[] = await this.ChatService.getPrivateMessages(Number(userId1), Number(userId2));
        const receiver: DetailUserData | null = await this.UserService.getUserById(Number(userId1));

        this.logger.info(`Got ${messages.length} messages`);

        return {
            messages,
            receiverPhoto: receiver?.photo
        };
    }
}
