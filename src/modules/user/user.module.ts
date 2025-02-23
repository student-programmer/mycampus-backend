import { Module } from '@nestjs/common';

import { CommonModule } from '../common';
import { UserController } from './controller';
import { UserService } from './service';
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        CommonModule,
        JwtModule.register({}),
    ],
    providers: [
        UserService
    ],
    controllers: [
        UserController
    ],
    exports: []
})
export class UserModule { }
