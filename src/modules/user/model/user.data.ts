import {ApiProperty, OmitType} from '@nestjs/swagger';
import {AuthUser, CompanyUser} from '@prisma/client';

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

export class ProtectedAuthData extends OmitType(AuthData, ['password'] as const) {
}


export class UserData {

    @ApiProperty()
    public readonly id: number;
    @ApiProperty()
    public readonly authUserId: number;
    @ApiProperty()
    public readonly firstName: string;
    @ApiProperty()
    public readonly lastName: string;
    @ApiProperty()
    public readonly email: string;
    @ApiProperty()
    public readonly birthDate: Date;
    @ApiProperty()
    public readonly description: string = '';
    @ApiProperty()
    public readonly sex: string;
    @ApiProperty()
    public readonly photo: string = '';
    @ApiProperty()
    public readonly location: string = '';
    @ApiProperty()
    public readonly countryId: number;
    @ApiProperty()
    public readonly languages: number[];
    @ApiProperty()
    public readonly university: number;
    @ApiProperty()
    public readonly studyDirection: number;
    @ApiProperty()
    public readonly interests: number[];

    public constructor(entity: any) {
        this.id = entity.id;
        this.authUserId = entity.authUserId;
        this.firstName = entity.firstName;
        this.lastName = entity.lastName;
        this.email = entity.authUser.email;
        this.birthDate = entity.birthDate;
        this.description = entity.description;
        this.sex = entity.sex;
        this.photo = entity.photo;
        this.location = entity.location;
        this.countryId = entity.countryId;
        this.languages = entity.languages.map((l: any) => l);
        this.university = entity.university;
        this.studyDirection = entity.studyDirection;
        this.interests = entity.interests.map((i: any) => i);
    }
}

export class DetailUserData {

    @ApiProperty()
    public readonly id: number;
    @ApiProperty()
    public readonly firstName: string;
    @ApiProperty()
    public readonly lastName: string;
    @ApiProperty()
    public readonly email: string;
    @ApiProperty()
    public readonly birthDate: Date;
    @ApiProperty()
    public readonly description: string = '';
    @ApiProperty()
    public readonly sex: string;
    @ApiProperty()
    public readonly photo: string;
    @ApiProperty()
    public readonly country: object;
    @ApiProperty()
    public readonly location: string;
    @ApiProperty()
    public readonly languages: object[];
    @ApiProperty()
    public readonly education: object;
    @ApiProperty()
    public readonly interests: object[];

    public constructor(entity: any) {
        this.id = entity.id;
        this.firstName = entity.firstName;
        this.lastName = entity.lastName;
        this.email = entity.authUser.email;
        this.birthDate = entity.birthDate;
        this.description = entity.description;
        this.sex = entity.sex;
        this.photo = entity.photo;
        this.location = entity.location;
        this.languages = entity.languages
            .map((l: any) => ({
                id: l.language.id,
                name: l.language.name
            }));
        this.education = {
            university: {
                id: entity.education[0].university.id,
                name: entity.education[0].university.name,
            },
            studyDirection: {
                 id: entity.education[0].studyDirection.id,
                name: entity.education[0].studyDirection.name,
            }
        };
        this.interests = entity.interests.map((l: any) => ({
            id: l.interest.id,
            name: l.interest.name
        }));
        this.country = {
            ...entity.country,
        };
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
