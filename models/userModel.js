import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    langua: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["patience", "doctor", "owner"] },
  },
  { timestamps: true },
);

const User = new mongoose.model("Doctor", UserSchema);
export default User;
