// users.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../common';
import { ConnectsController } from './connects.controller';
import { ConnectsService } from './connects.service';

@Module({
  imports: [],
  providers: [ConnectsService, PrismaService],
  controllers: [ConnectsController],
})
export class ConnectsModule {}
