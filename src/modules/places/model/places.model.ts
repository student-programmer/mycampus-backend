// src/modules/places/model/get-places.dto.ts

import {ApiProperty} from '@nestjs/swagger';
// eslint-disable-next-line import/no-extraneous-dependencies
import {Type} from 'class-transformer';
import {IsNumber, IsOptional, IsString, Min} from 'class-validator';
import {Place} from "@prisma/client";

export class GetPlacesDto {
    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    category?: string;

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    keywords?: string;

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    website?: string;

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    instagram?: string;

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    workingHours?: string;

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({default: 1})
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page: number = 1;

    @ApiProperty({default: 10})
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit: number = 10;

    @ApiProperty({required: false})
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    ratingMin?: number;

    @ApiProperty({required: false})
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    ratingMax?: number;

    constructor(entity?: Partial<GetPlacesDto>) {
        if (entity) {
            this.name = entity.name;
            this.category = entity.category;
            this.address = entity.address;
            this.keywords = entity.keywords;
            this.website = entity.website;
            this.instagram = entity.instagram;
            this.phoneNumber = entity.phoneNumber;
            this.workingHours = entity.workingHours;
            this.description = entity.description;
            this.page = entity.page ?? 1;
            this.limit = entity.limit ?? 10;
            this.ratingMin = entity.ratingMin;
            this.ratingMax = entity.ratingMax;
        }
    }
}

export interface PlacesResult {
    data: Place[];
    totalCount: number;
    lastPage: number;
}
