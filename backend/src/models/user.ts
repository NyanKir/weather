import { model, Schema } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

export const UserModel = model<IUser>('User', userSchema);
