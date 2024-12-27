import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger'; 

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI || '');
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`MongoDB Connection Error: ${error.message}`);
    } else {
      logger.error('Unexpected error occurred during MongoDB connection');
    }
    process.exit(1);
  }
};

export default connectDB;
