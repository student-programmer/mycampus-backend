// events.controller.ts
import { Controller, Get, Param, Query } from "@nestjs/common";
import { Event } from "@prisma/client";
import { EventsService } from "./events.service";

@Controller("events")
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    // Маршрут для получения всех событий с фильтрацией
    @Get()
    async getEvents(
        @Query()
        filters: {
            name?: string;
            category?: string;
            address?: string;
            priceMin?: number;
            priceMax?: number;
            website?: string;
            instagram?: string;
            phoneNumber?: string;
            description?: string;
            ticketSchedule?: string;
        }
    ): Promise<Event[]> {
        return this.eventsService.getAllEvents(filters); // Передаем фильтры в сервис
    }

    // Маршрут для получения одного события по id
    @Get(":id")
    async getEvent(@Param("id") id: string): Promise<Event | null> {
        return this.eventsService.getEventById(+id); // Передаем id в сервис
    }
}
