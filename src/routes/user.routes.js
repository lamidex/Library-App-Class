// write user routes logic here
import express from "express";
import { login, signup, uploadProfilePicture } from "../controllers/user.controller.js";
import upload from "../../src/utils/image/multer.js";
const router = express.Router();

// user routes go here
router.post("/signup", signup);
router.post("/login", login);
router.put("/upload/:id",upload.single('image'), uploadProfilePicture);

export default router;