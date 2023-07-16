import { model, Schema, Types } from 'mongoose';
import { SESSION_TTL } from '@config';

export interface ISession {
  user: Types.ObjectId;
  expiresAt: Date;
}

const sessionSchema = new Schema<ISession>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  expiresAt: {
    type: Date,
    required: true,
    expires: Number(SESSION_TTL)
  }
});

export const SessionModel = model<ISession>('Session', sessionSchema);
