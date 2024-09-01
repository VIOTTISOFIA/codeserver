import { createTransport } from "nodemailer";
import __dirname from "../../utils.js";
import environment from "./env.util.js";
const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = environment;

async function sendEmail(data) {
  try {
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: GOOGLE_EMAIL,
        pass: GOOGLE_PASSWORD,
      },
    });
    await transport.verify();
    await transport.sendMail({
      from: `BABY-SHOP <${GOOGLE_EMAIL}>`,
      to: data.to,
      subject: `USER ${data.email.toUpperCase()} REGISTERED!`,
      html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
            text-align: center;
          }
          p {
            font-size: 16px;
            line-height: 1.5;
            text-align: center;
          }
          .code {
            display: inline-block;
            font-size: 24px;
            font-weight: bold;
            color: #e74c3c;
            background: #f9f9f9;
            padding: 10px;
            border-radius: 5px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #aaa;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to BABY-SHOP!</h1>
          <p>Thank you for registering. To complete your registration, please use the following verification code:</p>
          <p class="code">${data.code}</p>
          <div class="footer">
            <p>If you did not request this, please ignore this email.</p>
            <p>&copy; 2024 BABY-SHOP. All rights reserved.</p>
            <p>Made by: Sofia Viotti & Roxana Garcia</p>
          </div>
        </div>
      </body>
    </html>
  `,
    });
  } catch (error) {
    throw error;
  }
}

export default sendEmail;
