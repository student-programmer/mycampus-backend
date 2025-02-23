import { BadRequestException, Body, Controller, HttpStatus, Inject, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

import { LoggerService, Config } from '../../common';

import { AuthPipe } from '../flow';
import { AuthInput, AccessTokenDto } from '../model';
import { UserService } from '../service';
import { Service } from "../../tokens";
import { JwtService } from "@nestjs/jwt";

@Controller('login')
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

  @Post()
  @ApiOperation({ summary: 'Auth User' })
  @ApiResponse({ status: HttpStatus.OK })
  public async signIn(@Body(AuthPipe) input: AuthInput): Promise<AccessTokenDto> {

    const User = await this.UserService.find(input['email']);

    if (!User) {
      throw new BadRequestException('User not find!');
    }

    const hash = await bcrypt.hash(input['password'], this.config.SALT_SECRET);
    const isMatch = await bcrypt.compare(User.authUser.password, hash);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    this.logger.info(`User with ID ${ User['id'] } success authenticated`);
    const payload = { sub: User['id'], username: User.authUser['email'] };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.config.JWT_SECRET,
        expiresIn: `${this.config.JWT_EXPIRATION_TIME}s`,
      }),
    };
  }

  @Post()
  @ApiOperation({ summary: 'Register User' })
  @ApiResponse({ status: HttpStatus.OK })
  public async registerUser(@Body(AuthPipe) input: AuthInput): Promise<AccessTokenDto> {

    return {};
  }
}
