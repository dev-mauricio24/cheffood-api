import mongoose from 'mongoose';

// Connecction MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI_MONGO);
    console.log("Connect database was Succesfull");
    
  } catch (error) {
    console.log(error)
    throw new Error('Database connection failed');
  }
}

