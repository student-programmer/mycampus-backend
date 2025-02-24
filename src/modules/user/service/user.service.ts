import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common';
import { AuthUser, User } from "@prisma/client";
import { RegisterInput } from "../model/user.input";

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

    return user
  }

  /**
   * Create User in the database
   *
   * @returns A User object
   */
  public async create(payload: RegisterInput): Promise<(User & { authUser: AuthUser }) | null> {
    const hashedPassword = payload['password']

    const user = await this.prismaService.user.create({
        data: {
          firstName: payload['firstName'],
          lastName: payload['lastName'],
          birthDate: payload['birthDate'],
          description: payload['description'],
          authUser: {
            create: {
              email: payload['email'],
              password: hashedPassword,
            },
          },
        },
        include: {
          authUser: true, // Включает информацию о связанном User
        },
      });
    console.log(user)

    return user
  }
}
