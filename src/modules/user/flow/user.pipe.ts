import * as Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import { AuthInput } from '../model';

export class AuthPipe extends JoiValidationPipe {

    public buildSchema(): Joi.Schema {

        return Joi.object<AuthInput>({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

    }
}
