import { errorResMsg, successResMsg } from "../utils/lib/response.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/image/cloudinary.js";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;
  try {
    if (!firstName || !lastName || !email || !password || !phone) {
      return res
        .status(400)
        .json({ message: "Please Fill All Required Fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      // return res.status(400).json({message: "Email Already Exists"})
      return errorResMsg(res, 400, "Email Already Exists");
    }
    //generate otp
    const otp = Math.floor(100000 + Math.random() * 900000);

    // hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      emailOtp: otp,
    });
    return successResMsg(res, 201, {
      message: "User Created Successfully",
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    return errorResMsg(res, 500, "Server Error");
  }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return errorResMsg(res, 400, "Fill All Fields");
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return errorResMsg(res, 404, "User Not Found");
      }
      console.log(user.emailVerified);
  
      if (user.emailVerified == "false") {
        return errorResMsg(res, 401, "Email Not Verified");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return errorResMsg(res, 401, "Invalid Password");
      }
      const payload = {
        id: user._id,
        email: user.email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return successResMsg(res, 200, {
        message: "Logged In Successfully",
        token,
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, "Server Error");
    }
  };

  // Upload Profile Picture
export const uploadProfilePicture = async (req, res) => {
    const userId = req.params.id;
    try {
      if (!userId) {
        return errorResMsg(res, 400, "User ID Is Required");
      }
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      const user = await User.findByIdAndUpdate(
        { _id: userId },
        { profilePic: result.secure_url },
        { new: true }
      );
      return successResMsg(res, 200, {
        message: "Profile Picture Updated Successfully",
        user,
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, "Server Error");
    }
  };
  