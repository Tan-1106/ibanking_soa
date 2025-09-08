import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME || "Your App"}" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html
    });

    console.log(`[email.service] Sent email to ${to} - messageId=${info.messageId}`);
    return { success: true, messageId: info.messageId, info };
  } catch (err) {
    console.error("[email.service] sendEmail error:", err);
    return { success: false, error: err?.message || err };
  }
};