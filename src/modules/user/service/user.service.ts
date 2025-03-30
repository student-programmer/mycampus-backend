import {BadRequestException, Injectable} from '@nestjs/common';

import {AuthUser, User} from '@prisma/client';
import {PrismaService} from '../../common';
import {DetailUserData} from '../model';
import {RegisterInput} from '../model/user.input';

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
    public async find(email: string): Promise<(DetailUserData) | null> {
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
    public async create(payload: RegisterInput, hashedPassword: string): Promise<(User & { authUser: AuthUser })> {

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
                // Добавляем связанные данные сразу через вложенные create
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
            },
        });

        return user;
    }
}
