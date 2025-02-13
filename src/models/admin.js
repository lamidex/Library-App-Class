import mongoose from "mongoose";
const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
    },
    resetOTP: {
      type: String,
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "user"],
      default: "admin",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Admin", adminSchema);