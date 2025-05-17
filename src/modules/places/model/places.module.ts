// src/places/places.module.ts
import { Module } from '@nestjs/common';
import { PlacesService } from '../service/places.service';
import { PlacesController } from '../controller/places.controller';
import { PrismaService } from '../../common';


@Module({
  providers: [PlacesService, PrismaService],
  controllers: [PlacesController],
})
export class PlacesModule {}
