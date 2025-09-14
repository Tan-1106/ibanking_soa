import nodemailer from "nodemailer";
import { Resend } from "resend";
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // ví dụ smtp.gmail.com
  port: process.env.SMTP_PORT, // 465 hoặc 587
  secure: process.env.SMTP_SECURE === "true", // true nếu dùng 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
export const sendMail = async (to, subject, html) => {
  const resend = new Resend(process.env.MAIL_TOKEN);
  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: to,
    subject: subject,
    html: html,
  });
}
// export const sendMail = async (to, subject, html) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Your App" <${process.env.SMTP_USER}>`,
//       to,
//       subject,
//       html
//     });
//     console.log("Email sent:", info.messageId);
//     return { success: true };
//   } catch (error) {
//     console.error("Send email error:", error);
//     return { success: false, error };
//   }
// };