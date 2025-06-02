import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  const mongoDBURI = process.env.MONGODB_URI || '';

  try {
    await mongoose.connect(mongoDBURI, {
      dbName: process.env.DB_NAME,
    });
  } catch (error) {
    console.error('Error:', error);
  }
};
