import { Module } from '@nestjs/common';

import { CommonModule } from '../common';
import { UserController } from './controller';
import { UserService } from './service';
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controller/userController";

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
