import Joi from 'joi';

interface Query {
  q: string;
}

export const searchLocationScheme = Joi.object<Query>({
  q: Joi.string().trim().min(1).required()
});
