import * as cloudinary from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from.env file into process.env object

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;