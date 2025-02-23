import { Language, Interest, University, StudyDirection } from '@prisma/client';
import { ApiProperty } from "@nestjs/swagger";

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

  public constructor(entity: Language) {
    this.id = entity.id;
    this.name = entity.name;
  }
}

export class InterestData {

  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly name: string;

  public constructor(entity: Language) {
    this.id = entity.id;
    this.name = entity.name;
  }
}

export class StudyDirectionData {

  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly name: string;

  public constructor(entity: Language) {
    this.id = entity.id;
    this.name = entity.name;
  }
}
