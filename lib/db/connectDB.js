import mongoose from 'mongoose';


const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("Please define the DATABASE_URL environment variable inside .env.local");
}

// Global variable for reuse (avoids re-connecting)
let isConnected = false;

const DbConnect = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: 'Nayai', 
    });

    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ Database connection failed', error);
    process.exit(1);
  }
};

export default DbConnect;