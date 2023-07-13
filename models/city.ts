import { Schema, model, models } from 'mongoose';

interface ICity {
  creator: {
    type: string;
    ref: string;
  };
  name: {
    type: string;
    unique: boolean;
    required: [boolean, string];
  };
  country: string;
}

const CitySchema = new Schema<ICity>({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    unique: [true, 'City already exists'],
    required: [true, 'City is required'],
  },
  country: String,
});

// Check if city exists, otherwise create a new city
const City = models.City || model<ICity>('City', CitySchema);

export default City;
