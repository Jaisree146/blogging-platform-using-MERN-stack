import mongoose from 'mongoose';

export default async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set');
  mongoose.set('strictQuery', true);
  
  // Extract database name from URI if present
  const dbName = uri.includes('?') 
    ? uri.split('/').pop().split('?')[0] 
    : uri.split('/').pop();
  
  const options = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };
  
  // Only add dbName if it's not empty
  if (dbName && dbName !== '') {
    options.dbName = dbName;
  }
  
  await mongoose.connect(uri, options);
  console.log('MongoDB connected');
}
