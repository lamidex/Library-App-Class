import { passwordCompare, passwordHash } from "../middleware/hashing.js";
import { errorResMsg, successResMsg } from "../utils/lib/response.js";
import jwt from "jsonwebtoken"
import logger from "../utils/log/logger.js";
import Admin from "../models/admin.js";
import { response } from "express";


export const adminSignUp = async (req, res)=> {
    const { firstName, lastName, email, password, phone } = req.body;
    try {
        if (!firstName || !lastName || !email || !password || !phone) {
            return res.status(400).json({ message: "Please Fill All Required Fields" });
        }
        const admin = await Admin.findOne({ email });
        if (admin) {
            return errorResMsg(res, 400, "Email Already Exists");
        }
        const hashedPassword = await passwordHash(password);

        const newAdmin = await Admin.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
        });
        return successResMsg(res, 201, {
            message: "Admin Created Successfully",
            user: newAdmin,
        });
    } catch (err) {
        console.error(err);
        return errorResMsg(res, 500, "Server Error");
    }
}

// Admin Login
export const adminLogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return errorResMsg(res, 400, "Please Fill All Fields");
        }
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return errorResMsg(res, 400, "Admin Not Found");
        }
        const isMatch = await passwordCompare(password, admin.password);
        if (!isMatch) {
            return errorResMsg(res, 400, "Incorrect password");
        }
        const payload = {
            id: admin._id,
            email: admin.email,
            role: admin.role
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
        return successResMsg(res, 200, {
            message: "Logged In Successfully",
            token
        });
    } catch (error) {
        console.log(error);
        
        logger.error(error);
        return errorResMsg(res, 500, "Server Error");
    }
}

export const updateAdmin = async (req, res) => {
    const {email} = req.body;
    try {
     if (!email) {
    return errorResMsg(res, 400, "Please enter a valid email")
     }   
     const admin = await Admin.findOne({email: email})
     console.log(admin);
     if (!admin) {
        return errorResMsg(res, 404, "Admin not found")
     }
     admin.role = 'superAdmin';
     await admin.save();
     return successResMsg(res, 200, {message: "Admin role updated successfully", admin})
    } catch (error) {
        logger.error(error);
        return errorResMsg(res, 500, "Server Error")
    }
}