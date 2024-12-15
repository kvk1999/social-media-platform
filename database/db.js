import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "SocialMedia",
    });

    console.log("Connected To MongoDB");
  } catch (error) {
    console.log(error);
  }
};
