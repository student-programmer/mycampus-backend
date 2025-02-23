import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common';
import { AuthUser, User } from "@prisma/client";

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
  public async find(email: string): Promise<(User & { authUser: AuthUser }) | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        authUser: {
          email: email,
        },
      },
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

    if (!user) {
      return user
    }

    return user
  }

  /**
   * Create User in the database
   *
   * @returns A User object
   */
  public async create(): Promise<(User & { authUser: AuthUser }) | null> {
    const user = await this.prismaService.authUser.create({
        data: {
          email: "test@example.com",
          password: "hashedpassword",
          user: {
            create: {
              firstName: "Иван",
              lastName: "Иванов",
              birthDate: new Date("1990-01-01"),
              description: "Пример описания профиля",
            },
          },
        },
        include: {
          user: true, // Включает информацию о связанном User
        },
      });

    if (!user) {
      return user
    }

    return user
  }
}
