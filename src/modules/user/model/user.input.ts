import {PickType} from '@nestjs/swagger';
import {AuthData, UserData, UserUpdatePass} from './user.data';

export class AuthInput extends PickType(AuthData, ['email', 'password'] as const) {
}


export class RegisterInput extends PickType(UserData, ['firstName', 'lastName', 'email', 'birthDate', 'description', 'languages', 'interests', 'university', 'studyDirection', 'sex', 'photo',
    'location', 'countryId'] as const) {
    public readonly password: string;
}

export class UpdateInput extends PickType(UserData, ['firstName', 'lastName', 'email', 'birthDate', 'description', 'languages', 'interests', 'university', 'studyDirection', 'sex', 'photo',
    'location', 'countryId'] as const) {
}

export class UpdatePass extends PickType(UserUpdatePass, ['password'] as const) {
}
