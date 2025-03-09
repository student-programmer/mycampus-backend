// users.service.ts
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../common";
import { UserFilterDto } from "./user-filter.dto";

@Injectable()
export class ConnectsService {
    constructor(private readonly prisma: PrismaService) {}

    // Метод для получения пользователей с фильтрацией
    async getUsers(filters: UserFilterDto): Promise<User[]> {
        return this.prisma.user.findMany({
          where: {
            ...(filters.firstName && {
              firstName: {
                contains: filters.firstName,
                mode: "insensitive",
              },
            }),
            ...(filters.lastName && {
              lastName: {
                contains: filters.lastName,
                mode: "insensitive",
              },
            }),
            ...(filters.birthDateMin && {
              birthDate: { gte: new Date(filters.birthDateMin) },
            }),
            ...(filters.birthDateMax && {
              birthDate: { lte: new Date(filters.birthDateMax) },
            }),
            ...(filters.description && {
              description: {
                contains: filters.description,
                mode: "insensitive",
              },
            }),
            ...(filters.authUserId && { authUserId: filters.authUserId }),
            ...(filters.languages && {
              languages: {
                some: {
                  language: {
                    name: {
                      contains: filters.languages,
                      mode: "insensitive",
                    },
                  },
                },
              },
            }),
            ...(filters.education && {
              education: {
                some: {
                  university: {
                    name: {
                      contains: filters.education,
                      mode: "insensitive",
                    },
                  },
                },
              },
            }),
            ...(filters.interests && {
              interests: {
                some: {
                  interest: {
                    name: {
                      contains: filters.interests,
                      mode: "insensitive",
                    },
                  },
                },
              },
            }),
          },
        });
    }

    // Метод для получения пользователя по ID
    async getUserById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                id, // предполагаем, что поле 'id' в базе данных уникально
            },
        });
    }
}
