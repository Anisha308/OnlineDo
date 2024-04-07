import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anishaanuu308@gmail.com",
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: "anishaanuu308@gmail.com",
      to,
      subject,
      text,
    });

    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    return false;
  }
};
export default sendEmail;
