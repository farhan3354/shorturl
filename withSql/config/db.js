import mongoose from "mongoose";

export const connecteddb = async (req, res) => {
  try {
    mongoose.connect("mongodb://localhost:27017");
    console.log("Connected to the database successfully!");
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
};
