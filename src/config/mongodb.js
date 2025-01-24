import { MongoClient } from "mongodb";

let client;
let isConnected = false;

export async function connectToMongoDB() {
  const url = "mongodb+srv://newadmin1:cyldeqP8wFC0loEi@ngotest.rsxzr.mongodb.net/?retryWrites=true&w=majority&appName=NGOTest"; // Replace with your actual MongoDB connection string.

  if (!client) {
    client = new MongoClient(url);
  }

  try {
    // Connect to the MongoDB cluster if not already connected
    if (!isConnected) {
      await client.connect();
      isConnected = true; // Mark the client as connected
      console.log("MongoDB is connected");
    }
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw new Error("Failed to connect to MongoDB");
  }
}

export const getDB = () => {
  if (!isConnected) {
    throw new Error("Database connection is not established. Call `connectToMongoDB()` first.");
  }
  return client.db(); // Return the database object
};
