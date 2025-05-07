import { Module } from '@nestjs/common';
import { S3Service, S3Config } from './s3.service';

@Module({
  providers: [S3Service],
  exports: [S3Service], // Важно экспортировать сервис
})
export class S3Module {
  static forRoot(config: S3Config) {
    return {
      module: S3Module,
      providers: [
        {
          provide: S3Service,
          useValue: new S3Service(config),
        },
      ],
      exports: [S3Service],
    };
  }
}
