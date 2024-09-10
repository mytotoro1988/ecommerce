import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDb = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Mongoose db is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: "Borcelle_Admin",
    });
    isConnected = true;
    console.log("Mongoose db is connected");
  } catch (err) {
    console.log(err);
  }
};
