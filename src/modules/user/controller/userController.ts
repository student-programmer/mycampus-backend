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
import {JwtService} from '@nestjs/jwt';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

import {LoggerService, Config, AuthGuard} from '../../common';

import {Service} from '../../tokens';
import {AuthPipe} from '../flow';
import {RegisterPipe} from '../flow/user.pipe';
import {AuthInput, AccessTokenDto, UserData} from '../model';
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

        const User = await this.UserService.find(input['email']);

        if (!User) {
            throw new BadRequestException({
                field: 'email',
                message: 'User not found!'
            });
        }

        const isMatch = await bcrypt.compare(input['password'], User.authUser.password);

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

    @Post('register')
    @ApiOperation({summary: 'Register User'})
    @ApiResponse({status: HttpStatus.OK})
    public async registerUser(@Body(RegisterPipe) input: RegisterInput): Promise<null> {
        const hashedPassword = await bcrypt.hash(input['password'], this.config.SALT_ROUNDS);
        const User = await this.UserService.create(input, hashedPassword);

        if (!User) {
            throw new BadRequestException({
                field: 'user',
                message: 'User not created!'
            });
        }

        this.logger.info(`User with ID ${User['id']} success authenticated`);

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
    @Get('profile')
    @ApiOperation({summary: 'Get profile'})
    async getProfile(@Request() req: Request) {

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
        this.logger.info(`User with ID ${User['id']} success authenticated`);


        if (!User) {
            throw new BadRequestException('User not find!');
        }

        return new UserData(User);
    }

}


