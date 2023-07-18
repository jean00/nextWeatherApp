import { Schema, model, models } from 'mongoose';

interface IUser {
  email: {
    type: string;
    unique: boolean;
    required: [boolean, string];
  };
  username: { type: string; required: [boolean, string] };
  image: string;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
  },
  image: {
    type: String,
  },
});

// Check if user exists, otherwise create a new user
const User = models.User || model<IUser>('User', UserSchema);

export default User;
