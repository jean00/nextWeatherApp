import mongoose from 'mongoose';

let isConnected = false; // track connection status
export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  const url = process.env.MONGODB_URI;
  if (isConnected) {
    console.log('mongoDB is already connected');
    return;
  } else {
    try {
      await mongoose.connect(url!, {
        dbName: 'users',
      });
      isConnected = true;
      console.log('mongoDB is connected');
    } catch (err) {
      console.log(err);
    }
  }
};
