export default function generateResetPasswordEmail(
  resetLink,
  siteName = "QuickNotes",
  username
) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>${siteName} Password Reset</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: auto;
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          .button {
            display: inline-block;
            padding: 12px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
          .footer {
            margin-top: 30px;
            font-size: 0.9em;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Hello ${username},</h2>
          <p>You recently requested to reset your password for <strong>${siteName}</strong>.</p>
          <p>Please click the button below to set a new password. This link is valid for <strong>5 minutes only</strong>.</p>
          <a href="${resetLink}" class="button">Reset Password</a>
          <p class="footer">If you didn’t request this, you can safely ignore this email.</p>
        </div>
      </body>
    </html>
  `;
}
