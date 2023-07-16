import { model, Schema, Types } from 'mongoose';

interface ILocation {
  name: string;
  user: Types.ObjectId;
  latitude: Types.Decimal128;
  longitude: Types.Decimal128;
}

const locationSchema = new Schema<ILocation>({
  name: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  longitude: {
    type: Types.Decimal128,
    required: true
  },
  latitude: {
    type: Types.Decimal128,
    required: true
  }
});

export const LocationModel = model<ILocation>('Location', locationSchema);
