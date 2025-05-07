import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from '../common';
import { UserController } from './controller';
import { AuthController } from './controller/userController';
import { UserService } from './service';
import { S3Module } from "../s3/s3.module";

@Module({
    imports: [
        S3Module.forRoot({
            s3Url: process.env.S3_URL || "",
            bucket: process.env.S3_BUCKET || "",
            accessKey: process.env.S3_ACCESS_KEY || "",
            secretKey: process.env.S3_SECRET_KEY || "",
            region: "ru-1",
            swiftUrl: process.env.S3_SWIFT_URL || ""
        }),
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
    exports: [UserService], // This makes UserService available to other modules
})
export class UserModule { }
