import { ENV } from "../config/env.js";
import { resend, sender } from "../config/resend.js";
import generateResetPasswordEmail from "./generateResetPasswordEmail.js";

export const emailHandler = async (email, name, resetLink) => {
  const { data, error } = await resend.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Quick Notes password verification",
    html: `${generateResetPasswordEmail(resetLink, ENV.SITE_NAME, name)}`,
  });

  if (error) {
    return console.error({ error });
  }

  //   console.log("email sent successfully", { data, code });
};
