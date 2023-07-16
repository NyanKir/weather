import Joi from 'joi';
import { IUser } from '@/models/user';

export const signUpSchema = Joi.object<IUser>({
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required()
});
