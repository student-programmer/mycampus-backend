// users.controller.ts
import { Controller, Get, Query, Param } from "@nestjs/common"; // Добавьте импорт Param
import { ConnectsService } from "./connects.service";
import { UserFilterDto } from "./user-filter.dto";
import {ApiTags} from "@nestjs/swagger";
import {DetailUserData} from "../user/model";

@Controller("connects")
@ApiTags('Connects')
export class ConnectsController {
    constructor(private readonly usersService: ConnectsService) {}

    // Получение всех пользователей с возможностью фильтрации
    @Get()
    async getUsers(@Query() filters: UserFilterDto): Promise<DetailUserData[]> {
        return this.usersService.getUsers(filters);
    }

    // Получение пользователя по ID
    @Get(":id")
    async getUserById(@Param("id") id: string): Promise<DetailUserData | null> {
        // Преобразуем id в число, если это необходимо
        const userId = parseInt(id, 10);
        if (isNaN(userId)) {
            throw new Error("Invalid ID format");
        }
        return this.usersService.getUserById(userId);
    }
}
