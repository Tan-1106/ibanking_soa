import OTP from "../models/otp.model.js";
import crypto from "crypto";
import { Op } from "sequelize";
import { sendMail } from "./mail.service.js";
import { otpEmailTemplate } from "../utils/emailTemplate.js";

// Gửi OTP
export const sendOTP = async (userId, email, purpose) => {
  const code = crypto.randomInt(100000, 999999).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  const otp = await OTP.create({ userId, code, purpose, expiresAt });

  await sendMail(email, "Mã xác thực OTP", otpEmailTemplate(code));

  return { otpId: otp.id, message: "OTP sent successfully" };
};

// Xác minh OTP
export const verifyOtp = async (userId, code) => {
  const otp = await OTP.findOne({ where: { userId, code } });
  if (!otp) {
    return { success: false, error: "Invalid OTP" };
  }

  if (otp.expiresAt < new Date()) {
    await otp.destroy(); // Xóa luôn OTP hết hạn
    return { success: false, error: "OTP expired" };
  }

  await otp.destroy(); // Xóa sau khi dùng thành công
  return { success: true, message: "OTP verified" };
};

// Hàm dọn OTP hết hạn (gọi bằng cron job)
export const cleanupExpiredOtp = async () => {
  const deleted = await OTP.destroy({
    where: {
      expiresAt: { [Op.lt]: new Date() }
    }
  });
  console.log(`Cleaned up ${deleted} expired OTP(s)`);
};