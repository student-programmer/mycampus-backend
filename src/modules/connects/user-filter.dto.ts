// user-filter.dto.ts
import {
    IsOptional,
    IsString,
    IsDateString,
    IsInt,
    Min,
} from 'class-validator';

export class UserFilterDto {
    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsDateString()
    birthDateMin?: string;

    @IsOptional()
    @IsDateString()
    birthDateMax?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    authUserId?: number;

    @IsOptional()
    @IsString()
    languages?: string;

    @IsOptional()
    @IsString()
    education?: string;

    @IsOptional()
    @IsString()
    interests?: string;
}
