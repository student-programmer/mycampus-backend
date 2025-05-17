import {Controller, Get, Param, Query} from '@nestjs/common';
import {Place} from '@prisma/client';
import {PlacesService} from '../service/places.service';
import {ApiTags} from "@nestjs/swagger";
import {GetPlacesDto, PlacesResult} from "../model/places.model";

@Controller('places')
@ApiTags('Places')
export class PlacesController {
    constructor(private readonly placesService: PlacesService) {
    }

    // Маршрут для получения всех мест с фильтрацией
    @Get()
    async getPlaces(
        @Query() filters: GetPlacesDto
    ): Promise<PlacesResult> {
        // Передаем фильтры в сервис
        return this.placesService.getAllPlaces(filters);
    }

    // Маршрут для получения одного места по id
    @Get(':id')
    async getPlace(@Param('id') id: string): Promise<Place | null> {
        return this.placesService.getPlaceById(+id);
    }
}
