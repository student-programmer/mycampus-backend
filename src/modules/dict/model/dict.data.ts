// eslint-disable-next-line max-classes-per-file
import {ApiProperty} from '@nestjs/swagger';
// eslint-disable-next-line import/no-extraneous-dependencies
import {Language, Interest, University, StudyDirection, Country} from '@prisma/client';

export class LanguageData {

    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly name: string;

    public constructor(entity: Language) {
        this.id = entity.id;
        this.name = entity.name;
    }
}

export class UniversityData {

    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly name: string;

    public constructor(entity: University) {
        this.id = entity.id;
        this.name = entity.name;
    }
}

export class InterestData {

    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly name: string;

    public constructor(entity: Interest) {
        this.id = entity.id;
        this.name = entity.name;
    }
}

export class StudyDirectionData {

    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly name: string;

    public constructor(entity: StudyDirection) {
        this.id = entity.id;
        this.name = entity.name;
    }
}

export class CountryData {

    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly name: string;

    @ApiProperty()
    public readonly photo: string | null;

    public constructor(entity: Country) {
        this.id = entity.id;
        this.name = entity.name;
        this.photo = entity?.photo ;
    }
}
