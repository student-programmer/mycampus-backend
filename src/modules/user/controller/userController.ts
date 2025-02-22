import { BadRequestException, Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoggerService } from '../../common';

import { AuthPipe } from '../flow';
import { AuthInput, UserData } from '../model';
import { UserService } from '../service';

@Controller('login')
@ApiTags('Users')
@ApiBearerAuth()
export class UserController {

    public constructor(
        private readonly logger: LoggerService,
        private readonly UserService: UserService
    ) { }

    @Post()
    @ApiOperation({ summary: 'Auth User' })
    @ApiResponse({ status: HttpStatus.OK, type: UserData })
    public async create(@Body(AuthPipe) input: AuthInput): Promise<UserData> {

        const User = await this.UserService.find(input.email);

        if (!User) {
            throw new BadRequestException('User not find!');
        }

        this.logger.info(`User with ID ${User.id} success authenticated`);

        return User;
    }

}
