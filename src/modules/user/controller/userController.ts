import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject, Param, ParseIntPipe,
  Post, Req,
  Request,
  UseGuards
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { LoggerService, Config, AuthGuard } from '../../common';

import { Service } from '../../tokens';
import { AuthPipe } from '../flow';
import { RegisterPipe, UpdatePasswordPipe, UpdatePipe } from '../flow/user.pipe';
import { AuthInput, AccessTokenDto, DetailUserData } from '../model';
import { RegisterInput, UpdateInput, UpdatePass } from '../model/user.input';
import { UserService } from '../service';
import { FastifyRequest } from "fastify";
import { finished } from "stream/promises";
import { S3Service } from "../../s3/s3.service";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

  public constructor(
    @Inject(Service.CONFIG)
    private readonly config: Config,
    private jwtService: JwtService,
    private readonly logger: LoggerService,
    private readonly UserService: UserService,
  ) {
  }

  @Post('login')
  @ApiOperation({ summary: 'Auth User' })
  @ApiResponse({ status: HttpStatus.OK })
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

    this.logger.info(`User with ID ${ User.id } success authenticated`);
    const payload = { sub: User.id, username: User.email };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.config.JWT_SECRET,
        expiresIn: `${ this.config.JWT_EXPIRATION_TIME }s`,
      }),
    };
  }

  @Post('register')
  @ApiOperation({ summary: 'Register User' })
  @ApiResponse({ status: HttpStatus.OK })
  public async registerUser(@Body(RegisterPipe) input: RegisterInput): Promise<null> {
    const hashedPassword = await bcrypt.hash(input['password'], Number(this.config.SALT_ROUNDS));
    const User = await this.UserService.create(input, hashedPassword);

    this.logger.info(`User with ID ${ User.id } success authenticated`);

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
    private readonly UserService: UserService,
    private readonly s3Service: S3Service
  ) {
  }

  @UseGuards(AuthGuard)
  @Get('current_profile')
  @ApiOperation({ summary: 'Get current profile' })
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
    const User = await this.UserService.getByEmail(payload['username']);

    // @ts-ignore
    this.logger.info(`User with ID ${ User.id } success authenticated`);


    if (!User) {
      throw new BadRequestException('User not find!');
    }

    return User;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  async getUserById(@Param('id', ParseIntPipe) id: number) {

    // @ts-ignore
    const User = await this.UserService.getUserById(Number(id));

    if (!User) {
      throw new BadRequestException('User not found!');
    }

    // @ts-ignore
    this.logger.info(`Get user with ${ User?.id }`);

    return User;
  }

  @UseGuards(AuthGuard)
  @Post('update')
  @ApiOperation({ summary: 'Update user' })
  async update(@Request() req: Request, @Body(UpdatePipe) updateData: UpdateInput): Promise<DetailUserData> {

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
    const User = await this.UserService.update(payload['username'], updateData);

    if (!User) {
      throw new BadRequestException('User not found!');
    }

    // @ts-ignore
    this.logger.info(`Get user with ${ User?.id }`);

    return User;
  }

  @UseGuards(AuthGuard)
  @Post('update_password')
  @ApiOperation({ summary: 'Update user password' })
  async updatePassword(@Request() req: Request, @Body(UpdatePasswordPipe) updateData: UpdatePass): Promise<AuthUser> {

    // @ts-ignore
    const jwtToken = req.headers['authorization'].replace('Bearer ', '');

    // @ts-ignore
    const payload = await this.jwtService.verifyAsync(
      jwtToken,
      {
        secret: this.config.JWT_SECRET
      }
    );

    const hashedPassword = await bcrypt.hash(updateData.password, Number(this.config.SALT_ROUNDS));

    // @ts-ignore
    const User = await this.UserService.updatePassword(payload['username'], hashedPassword);

    // @ts-ignore
    this.logger.info(`Get user with ${ User?.id }`);

    return User;
  }

  @UseGuards(AuthGuard)
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })

  async upload(@Req() req: FastifyRequest) {
    const part = await req.file();
    if (!part) {
      return { error: 'Файл не был передан' };
    }
    // @ts-ignore
    const jwtToken = req.headers['authorization'].replace('Bearer ', '');

    // @ts-ignore
    const payload = await this.jwtService.verifyAsync(
      jwtToken,
      {
        secret: this.config.JWT_SECRET
      }
    );

    const { file: stream, filename, mimetype } = part;

    const chunks: Buffer[] = [];
    stream.on('data', chunk => chunks.push(chunk));

    await finished(stream);
    const buffer = Buffer.concat(chunks);

    const key = `users/${ Date.now() }_${ filename }`;
    try {
      await this.s3Service.uploadFile(key, buffer, mimetype);
    } catch (error) {
      return { error: error.message };
    }

    const photoURL = `${ process.env.S3_URL }/${ process.env.S3_BUCKET }/${ key }`

    await this.UserService.updatePhoto(payload['username'], photoURL);

    return {
      message: 'Файл успешно загружен',
      photo: photoURL,
      mimeType: mimetype,
    };
  }

}


