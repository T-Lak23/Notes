import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API: process.env.CLOUDINARY_API,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_SENDER_NAME: process.env.RESEND_SENDER_NAME,
  RESEND_SENDER_EMAIL: process.env.RESEND_SENDER_EMAIL,
  RESEND_MAIL_FRONTEND_URL: process.env.RESEND_CLIENT_URL,
  SITE_NAME: process.env.SITE_NAME,
  JWT_RESET_SECRET: process.env.JWT_RESET_SECRET,
};
