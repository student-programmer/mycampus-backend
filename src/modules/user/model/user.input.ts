import { PickType } from '@nestjs/swagger';
import { AuthData } from './user.data';

export class AuthInput extends PickType(AuthData, ['email', 'password'] as const) {}
