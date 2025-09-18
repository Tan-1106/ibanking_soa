import nodemailer from "nodemailer";
import { Resend } from "resend";
const USER_EMAIL = process.env.USER_EMAIL || "nmdtruong18032004@gmail.com"
const USER_PASSWORD = process.env.USER_PASSWORD || "qzgl dnvd ixuu qito"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USER_EMAIL,
    pass: USER_PASSWORD,
  },
})

export const sendMail = async (to, subject, html) => {
  await transporter.sendMail({
    from: USER_EMAIL,
    to,
    subject,
    html,
  });
}
