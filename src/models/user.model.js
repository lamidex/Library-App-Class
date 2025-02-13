import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
    emailOtp: {
      type: String,
    },
    resetOTP: {
      type: String,
    },
    emailVerified: {
      type: String,
      default: false,
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema);