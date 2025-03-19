import { Controller, Get, Param, Query } from '@nestjs/common';
import { Place } from '@prisma/client';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
    constructor(private readonly placesService: PlacesService) {}

    // Маршрут для получения всех мест с фильтрацией
    @Get()
    async getPlaces(
        @Query()
        filters: {
            name?: string;
            rating?: number;
            category?: string;
            address?: string;
            keywords?: string;
            website?: string;
            instagram?: string;
            phoneNumber?: string;
            workingHours?: string;
            description?: string;
        }
    ): Promise<Place[]> {
        // Передаем фильтры в сервис
        return this.placesService.getAllPlaces(filters);
    }

    // Маршрут для получения одного места по id
    @Get(':id')
    async getPlace(@Param('id') id: string): Promise<Place | null> {
        return this.placesService.getPlaceById(+id);
    }
}
