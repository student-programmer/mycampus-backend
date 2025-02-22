import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common';
import { UserData } from '../model';

@Injectable()
export class UserService {

  public constructor(
    private readonly prismaService: PrismaService
  ) {
  }

  /**
   * Find all Users in the database
   *
   * @returns A User object
   */
  public async find(email: string): Promise<UserData | null> {
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

    return new UserData(user)
  }
}
