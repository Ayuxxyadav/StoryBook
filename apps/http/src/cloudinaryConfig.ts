import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"
dotenv.config()

const {CLOUD_NAME , CLOUDINARY_API_KEY ,CLOUDINARY_API_SECRET } =process.env
if (!CLOUDINARY_API_KEY) {
  console.error("Error: CLOUDINARY_API_KEY is missing from .env file!");
}

cloudinary.config({
  cloud_name: CLOUD_NAME ,
  api_key: CLOUDINARY_API_KEY ,
  api_secret: CLOUDINARY_API_SECRET
});

export default cloudinary;
