import { Injectable } from "@nestjs/common";
import { Place } from "@prisma/client";
import { PrismaService } from "../common";

@Injectable()
export class PlacesService {
    constructor(private readonly prisma: PrismaService) {}

    // Метод с фильтрацией
    async getAllPlaces(filters: {
        name?: string;
        ratingMin?: number;
        ratingMax?: number;
        category?: string;
        address?: string;
        keywords?: string;
        website?: string;
        instagram?: string;
        phoneNumber?: string;
        workingHours?: string;
        description?: string;
    }): Promise<Place[]> {
        const {
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
        } = filters;

        // Динамическая сборка фильтра
        const where: { [key: string]: any } = {};

        if (name) where.name = { contains: name, mode: "insensitive" }; // ищет по части имени
        if (ratingMin || ratingMax) where.rating = {}; // фильтрация по рейтингу

        // Если указаны ratingMin и ratingMax, создаем условие для диапазона
        if (ratingMin || ratingMax) where.rating = {}; // фильтрация по рейтингу

        if (ratingMin && ratingMax) {
            where.rating = {
                gte: parseFloat(ratingMin.toString()), // минимальный рейтинг (преобразуем в число)
                lte: parseFloat(ratingMax.toString()), // максимальный рейтинг (преобразуем в число)
            };
        } else {
            if (ratingMin) where.rating.gte = parseFloat(ratingMin.toString()); // минимальный рейтинг
            if (ratingMax) where.rating.lte = parseFloat(ratingMax.toString()); // максимальный рейтинг
        }

        if (category)
            where.category = { contains: category, mode: "insensitive" }; // ищет по части категории
        if (address) where.address = { contains: address, mode: "insensitive" }; // ищет по части адреса
        if (keywords)
            where.keywords = { contains: keywords, mode: "insensitive" }; // фильтрация по ключевым словам
        if (website) where.website = { contains: website, mode: "insensitive" }; // фильтрация по вебсайту
        if (instagram)
            where.instagram = { contains: instagram, mode: "insensitive" }; // фильтрация по инстаграму
        if (phoneNumber)
            where.phoneNumber = { contains: phoneNumber, mode: "insensitive" }; // фильтрация по номеру телефона
        if (workingHours)
            where.workingHours = {
                contains: workingHours,
                mode: "insensitive",
            }; // фильтрация по часам работы
        if (description)
            where.description = { contains: description, mode: "insensitive" }; // фильтрация по описанию

        return this.prisma.place.findMany({
            where, // передаем фильтр в запрос
        });
    }
    // Получение одного места по ID
    async getPlaceById(id: number): Promise<Place | null> {
        return this.prisma.place.findUnique({
            where: { id },
        });
    }
}
