import { AuthUser, CompanyUser } from '@prisma/client';
import { ApiProperty, OmitType } from "@nestjs/swagger";

export class AuthData {

  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly email: string;

  @ApiProperty()
  public readonly password: string;

  public constructor(entity: AuthUser) {
    this.id = entity.id;
    this.email = entity.email;
    this.password = entity.password;
  }
}

export class ProtectedAuthData extends OmitType(AuthData, ['password'] as const) {}


export class UserData {

  public static readonly NAME_LENGTH = 50;

  public readonly id: number;
  public readonly authUserId: number;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly birthDate: Date;
  public readonly description: string | null;
  public readonly languages: [string] | null;
  public readonly education: [];
  public readonly interests: [];

  public constructor(entity: any) {
    this.id = entity.id;
    this.authUserId = entity.authUserId;
    this.firstName = entity.firstName;
    this.lastName = entity.lastName;
    this.email = entity.authUser.email;
    this.birthDate = entity.birthDate;
    this.description = entity.description;
    this.languages = entity.languages.map((l: any) => l.language.name);
    this.education = entity.education.map((e: any) => {
      return {education: e.university.name, studyDirection: e.studyDirection.name}
    });
    this.interests = entity.interests.map((i: any) => i.interest.name);
  }
}


export class CompanyUserData {

  public static readonly NAME_LENGTH = 50;

  public readonly id: number;
  public readonly authUserId: number;
  public readonly name: string | null;

  public constructor(entity: CompanyUser) {
    this.id = entity.id;
    this.name = entity.name;
    this.authUserId = entity.authUserId;
  }
}
