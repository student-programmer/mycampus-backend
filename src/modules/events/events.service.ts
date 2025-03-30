import { Injectable } from '@nestjs/common';
import { Event } from '@prisma/client';
import { PrismaService } from '../common';

@Injectable()
export class EventsService {
    constructor(private readonly prisma: PrismaService) {}

    // Метод с фильтрацией
    async getAllEvents(filters: {
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
    }): Promise<Event[]> {
        const {
            name,
            category,
            address,
            priceMin,
            priceMax,
            website,
            instagram,
            phoneNumber,
            description,
            ticketSchedule,
        } = filters;

        // Динамическая сборка фильтра
        const where: { [key: string]: any } = {};

        if (name) where.name = { contains: name, mode: 'insensitive' }; // ищет по части имени
        if (category)
            {where.category = { contains: category, mode: 'insensitive' };} // ищет по части категории
        if (address) where.address = { contains: address, mode: 'insensitive' }; // ищет по части адреса
        if (website) where.website = { contains: website, mode: 'insensitive' }; // фильтрация по вебсайту
        if (instagram)
            {where.instagram = { contains: instagram, mode: 'insensitive' };} // фильтрация по инстаграму
        if (phoneNumber)
            {where.phoneNumber = { contains: phoneNumber, mode: 'insensitive' };} // фильтрация по номеру телефона
        if (description)
            {where.description = { contains: description, mode: 'insensitive' };} // фильтрация по описанию
        if (ticketSchedule)
            {where.ticketSchedule = {
                contains: ticketSchedule,
                mode: 'insensitive',
            };} // фильтрация по расписанию

        // Фильтрация по цене, если указаны минимальная и максимальная цена
        if (priceMin || priceMax) {
            where.price = {}; // создаём объект для цены

            if (priceMin) where.price.gte = priceMin; // минимальная цена
            if (priceMax) where.price.lte = priceMax; // максимальная цена
        }

        return this.prisma.event.findMany({
            where, // передаем фильтр в запрос
        });
    }

    // Получение одного события по ID
    async getEventById(id: number): Promise<Event | null> {
        return this.prisma.event.findUnique({
            where: { id },
        });
    }
}
