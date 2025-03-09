import { Controller, Get, Param, Query } from '@nestjs/common';
import { Place } from '@prisma/client';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
    constructor(private readonly placesService: PlacesService) {}

    // Маршрут для получения всех мест с фильтрацией
    @Get()
    async getPlaces(
        @Query('name') name?: string,
        @Query('ratingMin') ratingMin?: number,
        @Query('ratingMax') ratingMax?: number,
        @Query('category') category?: string,
        @Query('address') address?: string,
        @Query('keywords') keywords?: string,
        @Query('website') website?: string,
        @Query('instagram') instagram?: string,
        @Query('phoneNumber') phoneNumber?: string,
        @Query('workingHours') workingHours?: string,
        @Query('description') description?: string
    ): Promise<Place[]> {
        // Создаем объект фильтров
        const filters = {
            name,
            ratingMin,
            ratingMax,
            category,
            address,
            keywords,
            website,
            instagram,
            phoneNumber,
            workingHours,
            description,
        };

        // Передаем фильтры в сервис
        return this.placesService.getAllPlaces(filters);
    }

    // Маршрут для получения одного места по id
    @Get(':id')
    async getPlace(@Param('id') id: string): Promise<Place | null> {
        return this.placesService.getPlaceById(+id);
    }
}
