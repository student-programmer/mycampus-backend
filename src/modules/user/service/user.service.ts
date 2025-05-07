import {BadRequestException, Injectable} from '@nestjs/common';

import {AuthUser} from '@prisma/client';
import {PrismaService} from '../../common';
import {DetailUserData} from '../model';
import {RegisterInput, UpdateInput} from '../model/user.input';

@Injectable()
export class UserService {

    public constructor(
        private readonly prismaService: PrismaService
    ) {
    }

    /**
     * Find one User in the database by email
     *
     * @returns A User object
     */
    public async getByEmail(email: string): Promise<(DetailUserData) | null> {
        const authUser = await this.prismaService.authUser.findUnique({
            where: {email}
        });

        if (!authUser) return null;

        const user = await this.prismaService.user.findUnique({
            where: {authUserId: authUser.id},
            include: {
                authUser: true,
                languages: {
                    include: {
                        language: true
                    }
                },
                education: {
                    include: {
                        university: true,
                        studyDirection: true
                    },
                },
                interests: {
                    include: {
                        interest: true,
                    }
                },
                country: true,
            },
        });

        return new DetailUserData(user);
    }

    public async getUserById(id: number): Promise<(DetailUserData) | null> {
        const authUser = await this.prismaService.authUser.findUnique({
            where: {id}
        });

        if (!authUser) return null;

        const user = await this.prismaService.user.findUnique({
            where: {authUserId: authUser.id},
            include: {
                authUser: true,
                languages: {
                    include: {
                        language: true
                    }
                },
                education: {
                    include: {
                        university: true,
                        studyDirection: true
                    },
                },
                interests: {
                    include: {
                        interest: true,
                    }
                },
            },
        });

        return new DetailUserData(user);
    }


    public async getAuthUser(email: string): Promise<(AuthUser) | null> {
        const authUser = await this.prismaService.authUser.findUnique({
            where: {email}
        });

        if (!authUser) return null;

        return authUser;
    }


    /**
     * Create User in the database
     *
     * @returns A User object
     */
    public async create(payload: RegisterInput, hashedPassword: string): Promise<DetailUserData> {

        const email: string = payload['email'];
        const authUser = await this.prismaService.authUser.findUnique({
            where: {email}
        });

        if (authUser) {
            throw new BadRequestException({
                field: 'email',
                message: 'User already created!',
            });
        }

        const user = await this.prismaService.user.create({
            data: {
                firstName: payload.firstName,
                lastName: payload.lastName,
                birthDate: payload.birthDate,
                description: payload.description,
                authUser: {
                    create: {
                        email: payload.email,
                        password: hashedPassword,
                    },
                },
                country: {
                    connect: {
                        id: payload.countryId,
                    }
                },
                interests: {
                    createMany: {
                        data: payload.interests.map(interestId => ({
                            interestId,
                        })),
                        skipDuplicates: true,
                    },
                },
                languages: {
                    createMany: {
                        data: payload.languages.map(languageId => ({
                            languageId,
                        })),
                        skipDuplicates: true,
                    },
                },
                education: {
                    create: {
                        universityId: payload.university,
                        studyDirectionId: payload.studyDirection,
                    },
                },
            },
            include: {
                authUser: true,
                interests: {
                    include: {
                        interest: true,
                    },
                },
                languages: {
                    include: {
                        language: true,
                    },
                },
                education: {
                    include: {
                        university: true,
                        studyDirection: true,
                    },
                },
                country: true,
            },
        });

        return new DetailUserData(user);
    }

    public async update(email: string, updateData: UpdateInput): Promise<(DetailUserData) | null> {

        const authUser = await this.prismaService.authUser.findUnique({
            where: {email}
        });

        if (!authUser) return null;

        await this.prismaService.authUser.update({
            where: {
                id: authUser.id
            },
            data: {
                email
            }
        });


        const updateUser = await this.prismaService.user.update({
            where: {
                authUserId: authUser.id, // Передай сюда ID из AuthUser
            },
            data: {
                firstName: updateData.firstName,
                lastName: updateData.lastName,
                description: updateData.description,
                birthDate: updateData.birthDate,
                sex: updateData.sex,
                location: updateData.location,
                countryId: updateData.countryId,

                languages: {
                    deleteMany: {}, // Удаляем все текущие языки
                    create: updateData.languages.map(item => ({languageId: item}))
                },

                interests: {
                    deleteMany: {},
                    create: updateData.interests.map(item => ({interestId: item}))
                },

                education: {
                    deleteMany: {},
                    create: {
                        universityId: updateData.university,
                        studyDirectionId: updateData.studyDirection,
                    }
                },
            },
            include: {
                authUser: true,
                interests: {
                    include: {
                        interest: true,
                    },
                },
                languages: {
                    include: {
                        language: true,
                    },
                },
                education: {
                    include: {
                        university: true,
                        studyDirection: true,
                    },
                },
                country: true,
            },
        });


        return new DetailUserData(updateUser);
    }

    public async updatePhoto(email: string, photoURL: string): Promise<Boolean> {

        const authUser = await this.prismaService.authUser.findUnique({
            where: {email}
        });

        if (!authUser) return false;

        await this.prismaService.user.update({
            where: {
                authUserId: authUser.id,
            },
            data: {
                photo: photoURL,
            },
            include: {
                authUser: true,
            },
        });


        return true
    }

    public async updatePassword(email: string, hashedPassword: string): Promise<(AuthUser)> {

        const authUser = await this.prismaService.authUser.update({
            where: {
                email
            },
            data: {
                password: hashedPassword
            }
        });

        return authUser;
    }
}
