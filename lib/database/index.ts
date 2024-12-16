import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Define a type for the cached object
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Safely extend the global object with a mongoose cache
const globalWithMongooseCache = global as typeof global & { mongoose: MongooseCache };

// Use the global cache or initialize it
const cached: MongooseCache = globalWithMongooseCache.mongoose || { conn: null, promise: null };

// Assign the cache to the global object for reuse
globalWithMongooseCache.mongoose = cached;

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn; // Return cached connection if available
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is missing');
  }

  if (!cached.promise) {
    // Create a new connection promise if one doesn't already exist
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'Hanba',
      bufferCommands: false,
    });
  }

  // Wait for the promise to resolve and cache the connection
  cached.conn = await cached.promise;

  return cached.conn;
};

