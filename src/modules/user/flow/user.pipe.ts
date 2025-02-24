import * as Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import { AuthInput } from '../model';
import { RegisterInput } from "../model/user.input";

export class AuthPipe extends JoiValidationPipe {

    public buildSchema(): Joi.Schema {

        return Joi.object<AuthInput>({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

    }
}

export class RegisterPipe extends JoiValidationPipe {

    public buildSchema(): Joi.Schema {

        return Joi.object<RegisterInput>({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            description: Joi.string().required(),
            birthDate: Joi.date().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

    }
}
