import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase(uri: string = Bun.env.MONGO_URI || ""): Promise<void> {
  if (isConnected) return;
  if (!uri) {
    throw new Error("MONGO_URI is not set");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, {
    autoIndex: true,
  });
  isConnected = true;
}

export async function disconnectFromDatabase(): Promise<void> {
  if (!isConnected) return;
  await mongoose.disconnect();
  isConnected = false;
}
