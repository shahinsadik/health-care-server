import nodemailer from "nodemailer";
import config from "../../../config";

const emailSender = async (eamil: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.emailSender.email,
      pass: config.emailSender.app_password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: '"SS Health Care" <shahinsadik.dev@gmail.com>',
    to: eamil,
    subject: "Password Reset",
    // text: "Hello world?", // plain‑text body
    html, // HTML body
  });

  console.log("Message sent:", info.messageId);
};

export default emailSender;
