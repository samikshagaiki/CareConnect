import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise || mongoose.connection.readyState === 0) {
    const opts = {
      dbName: "careconnect",
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null;
        cached.conn = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    cached.conn = null;
    throw e;
  }

  return cached.conn;
}
