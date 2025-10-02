import { Resend } from "resend";
import { ENV } from "./env.js";

export const resend = new Resend(ENV.RESEND_API_KEY);

export const sender = {
  name: ENV.RESEND_SENDER_NAME,
  email: ENV.RESEND_SENDER_EMAIL,
};
