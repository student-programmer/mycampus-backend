import * as Joi from 'joi';

import {JoiValidationPipe} from '../../common';
import {AuthInput} from '../model';
import {RegisterInput, UpdateInput, UpdatePass} from '../model/user.input';

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
            sex: Joi.string().required(),
            location: Joi.string().allow(null).allow(''),
            photo: Joi.string().allow(null).allow(''),
            countryId: Joi.number().required(),
            languages: Joi.array().items(Joi.number()).required(),
            university: Joi.number().required(),
            studyDirection: Joi.number().required(),
            interests: Joi.array().items(Joi.number()).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

    }
}


export class UpdatePipe extends JoiValidationPipe {

    public buildSchema(): Joi.Schema {

        return Joi.object<UpdateInput>({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            description: Joi.string().required(),
            birthDate: Joi.date().required(),
            sex: Joi.string().required(),
            location: Joi.string().allow(null).allow(''),
            photo: Joi.string().allow(null).allow(''),
            countryId: Joi.number().required(),
            languages: Joi.array().items(Joi.number()).required(),
            university: Joi.number().required(),
            studyDirection: Joi.number().required(),
            interests: Joi.array().items(Joi.number()).required(),
            email: Joi.string().email().required(),
        });

    }
}

export class UpdatePasswordPipe extends JoiValidationPipe {

    public buildSchema(): Joi.Schema {

        return Joi.object<UpdatePass>({
            password: Joi.string().required(),
        });

    }
}
