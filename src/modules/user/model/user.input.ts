import { PickType } from '@nestjs/swagger';
import { AuthData, UserData } from './user.data';

export class AuthInput extends PickType(AuthData, ['email', 'password'] as const) {}


export class RegisterInput extends PickType(UserData, ['firstName', 'lastName', 'email', 'birthDate', 'description'] as const) {
  public readonly password: string;
}
