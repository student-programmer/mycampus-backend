// users.controller.ts
import { Controller, Get, Query, Param } from "@nestjs/common"; // Добавьте импорт Param
import { User } from "@prisma/client";
import { ConnectsService } from "./connects.service";
import { UserFilterDto } from "./user-filter.dto";

@Controller("connects")
export class ConnectsController {
    constructor(private readonly usersService: ConnectsService) {}

    // Получение всех пользователей с возможностью фильтрации
    @Get()
    async getUsers(@Query() filters: UserFilterDto): Promise<User[]> {
        return this.usersService.getUsers(filters);
    }

    // Получение пользователя по ID
    @Get(":id")
    async getUserById(@Param("id") id: string): Promise<User | null> {
        // Преобразуем id в число, если это необходимо
        const userId = parseInt(id, 10);
        if (isNaN(userId)) {
            throw new Error("Invalid ID format");
        }
        return this.usersService.getUserById(userId);
    }
}
