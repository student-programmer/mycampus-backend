import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    Inject,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

import {LoggerService, Config, AuthGuard} from '../../common';

import {AuthPipe} from '../flow';
import {AuthInput, AccessTokenDto, UserData} from '../model';
import {UserService} from '../service';
import {Service} from "../../tokens";
import {JwtService} from "@nestjs/jwt";
import {RegisterInput} from "../model/user.input";
import {RegisterPipe} from "../flow/user.pipe";

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
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

        const User = await this.UserService.find(input['email']);

        if (!User) {
            throw new BadRequestException({
                field: 'email',
                message: 'User not found!'
            });
        }

        const hash = await bcrypt.hash(input['password'], this.config.SALT_SECRET);

        // const isMatch = await bcrypt.compare(User.authUser.password, hash);

        const isMatch = User.authUser.password === hash;

        if (!isMatch) {
            throw new BadRequestException({
                field: 'password',
                message: 'Incorrect password!'
            });
        }

        this.logger.info(`User with ID ${User['id']} success authenticated`);
        const payload = {sub: User['id'], username: User.authUser['email']};

        return {
            access_token: await this.jwtService.signAsync(payload, {
                secret: this.config.JWT_SECRET,
                expiresIn: `${this.config.JWT_EXPIRATION_TIME}s`,
            }),
        };
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req: Request) {
        // @ts-ignore
        const User = await this.UserService.find(req?.user?.email);

        if (!User) {
            throw new BadRequestException('User not find!');
        }

        return new UserData(User);
    }
}

@Controller('user')
@ApiTags('Users')
@ApiBearerAuth()
export class UserController {

    public constructor(
        @Inject(Service.CONFIG)
        private readonly config: Config,
        private jwtService: JwtService,
        private readonly logger: LoggerService,
        private readonly UserService: UserService
    ) {
    }

    @Post('register')
    @ApiOperation({summary: 'Register User'})
    @ApiResponse({status: HttpStatus.OK})
    public async registerUser(@Body(RegisterPipe) input: RegisterInput): Promise<AccessTokenDto> {
        const hashedPassword = await bcrypt.hash(input['password'], this.config.SALT_SECRET);
        const User = await this.UserService.create(input, hashedPassword);

        if (!User) {
            throw new BadRequestException({
                field: 'user',
                message: 'User not created!'
            });
        }

        this.logger.info(`User with ID ${User['id']} success authenticated`);
        const payload = {sub: User['id'], username: User.authUser['email']};

        return {
            access_token: await this.jwtService.signAsync(payload, {
                secret: this.config.JWT_SECRET,
                expiresIn: `${this.config.JWT_EXPIRATION_TIME}s`,
            })
        };
    }
}


