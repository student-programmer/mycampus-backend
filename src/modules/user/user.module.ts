import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from '../common';
import { UserController } from './controller';
import { AuthController } from './controller/userController';
import { UserService } from './service';

@Module({
    imports: [
        CommonModule,
        JwtModule.register({}),
    ],
    providers: [
        UserService
    ],
    controllers: [
        UserController,
        AuthController
    ],
    exports: []
})
export class UserModule { }
