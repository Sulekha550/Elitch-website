import mongoose from 'mongoose';

// Disable mongoose buffering globally so queries don't hang for 10s when connection drops
mongoose.set('bufferCommands', false);

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('[MongoDB Error] MONGO_URI is not defined in environment variables. Check backend/.env');
    return null;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      autoIndex: true,
    });
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host} / database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB] Connection error:`, error.message);
    console.warn(`[MongoDB Notice] If MongoDB Atlas IP access list is restricted, ensure 0.0.0.0/0 or your current public IP is allowed in Atlas console.`);
    return null;
  }
};

mongoose.connection.on('error', (err) => {
  console.error('[MongoDB Connection Error Event]:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB Event]: Disconnected from database cluster.');
});

mongoose.connection.on('reconnected', () => {
  console.log('[MongoDB Event]: Reconnected to database cluster.');
});
