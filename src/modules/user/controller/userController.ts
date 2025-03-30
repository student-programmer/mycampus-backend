import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    Inject, Param, ParseIntPipe,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

import {LoggerService, Config, AuthGuard} from '../../common';

import {Service} from '../../tokens';
import {AuthPipe} from '../flow';
import {RegisterPipe} from '../flow/user.pipe';
import {AuthInput, AccessTokenDto} from '../model';
import {RegisterInput} from '../model/user.input';
import {UserService} from '../service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    public constructor(
        @Inject(Service.CONFIG)
        private readonly config: Config,
        private jwtService: JwtService,
        private readonly logger: LoggerService,
        private readonly UserService: UserService
    ) {
    }

    @Post('login')
    @ApiOperation({summary: 'Auth User'})
    @ApiResponse({status: HttpStatus.OK})
    public async signIn(@Body(AuthPipe) input: AuthInput): Promise<AccessTokenDto> {

        const User = await this.UserService.getAuthUser(input['email']);

        if (!User) {
            throw new BadRequestException({
                field: 'email',
                message: 'User not found!'
            });
        }

        const isMatch = await bcrypt.compare(input['password'], User.password);

        if (!isMatch) {
            throw new BadRequestException({
                field: 'password',
                message: 'Incorrect password!'
            });
        }

        this.logger.info(`User with ID ${User.id} success authenticated`);
        const payload = {sub: User.id, username: User.email};

        return {
            access_token: await this.jwtService.signAsync(payload, {
                secret: this.config.JWT_SECRET,
                expiresIn: `${this.config.JWT_EXPIRATION_TIME}s`,
            }),
        };
    }

    @Post('register')
    @ApiOperation({summary: 'Register User'})
    @ApiResponse({status: HttpStatus.OK})
    public async registerUser(@Body(RegisterPipe) input: RegisterInput): Promise<null> {
        const hashedPassword = await bcrypt.hash(input['password'], Number(this.config.SALT_ROUNDS));
        const User = await this.UserService.create(input, hashedPassword);

        this.logger.info(`User with ID ${User.id} success authenticated`);

        return null;
    }

}

@Controller('user')
@ApiTags('Users')
@ApiBearerAuth('access-token')
export class UserController {

    public constructor(
        @Inject(Service.CONFIG)
        private readonly config: Config,
        private jwtService: JwtService,
        private readonly logger: LoggerService,
        private readonly UserService: UserService
    ) {
    }

    @UseGuards(AuthGuard)
    @Get('current_profile')
    @ApiOperation({summary: 'Get current profile'})
    async getCurrentUser(@Request() req: Request) {

        // @ts-ignore
        const jwtToken = req.headers['authorization'].replace('Bearer ', '');

        // @ts-ignore
        const payload = await this.jwtService.verifyAsync(
            jwtToken,
            {
                secret: this.config.JWT_SECRET
            }
        );

        // @ts-ignore
        const User = await this.UserService.find(payload['username']);

        // @ts-ignore
        this.logger.info(`User with ID ${User.id} success authenticated`);


        if (!User) {
            throw new BadRequestException('User not find!');
        }

        return User;
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    @ApiOperation({summary: 'Get profile by id'})
    async getUserById(@Param('id', ParseIntPipe) id: number) {

        // @ts-ignore
        const User = await this.UserService.getUserById(Number(id));

        if (!User) {
            throw new BadRequestException('User not found!');
        }

        // @ts-ignore
        this.logger.info(`Get user with ${User?.id}`);

        return User;
    }

}


