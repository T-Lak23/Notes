import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env.js";
const { CLOUDINARY_NAME, CLOUDINARY_SECRET, CLOUDINARY_API } = ENV;
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API,
  api_secret: CLOUDINARY_SECRET,
});
export default cloudinary;
