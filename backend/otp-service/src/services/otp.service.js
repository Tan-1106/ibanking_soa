import crypto from "crypto";
import "dotenv/config";
import OTP from "../models/otp.model.js";
import ApiError from "../utils/ApiError.js";
import { otp_template } from "../utils/emailTemplate.js";
import fetchApi from "../utils/fetchApi.js";
import { sendMail } from "./mail.service.js";

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://user-service:4001";
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || "http://payment-service:4003";
const otpService = {

  sendPaymentOTP: async (userId, paymentId, token) => {
    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 60 * 1000);
    const otp = await OTP.create({ userId, code, paymentId, expiresAt });
    if (!otp) {
      throw new ApiError(500, "Failed to create OTP", "Database error while creating OTP");
    }
    let apiEndpoint = `${USER_SERVICE_URL}/users/me`;
    const response = await fetchApi(apiEndpoint, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const user = response.data;
    if (!user) {
      throw new ApiError(404, "User not found", " User with ID " + userId + " does not exist");
    }
    apiEndpoint = `${PAYMENT_SERVICE_URL}/payments/${paymentId}`;
    const paymentResponse = await fetchApi(apiEndpoint, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const payment = paymentResponse.data;
    if (!payment) {
      throw new ApiError(404, "Payment not found", " Payment with ID " + paymentId + " does not exist");
    }
    if (payment.status !== "pending") {
      throw new ApiError(400, "Invalid Payment Status", " OTP can only be sent for pending payments");
    }
    await sendMail({
      to: user.email,
      subject: "Your Payment OTP Code",
      html: otp_template(user.fullName, code)
    });
    return true;
  },

  verifyOtp: async (userId, paymentId, code) => {
    const otp = await OTP.findOne({ where: { userId, code, paymentId } });
    if (!otp) {
      throw new ApiError(400, "Invalid OTP", "The provided OTP is incorrect");
    }
    if (otp.expiresAt < new Date()) {
      throw new ApiError(400, "OTP Expired", "The provided OTP has expired");
    }
    await otp.destroy();
    return true;
  },

  // cleanupExpiredOtp: async () => {
  //   const deleted = await OTP.destroy({
  //     where: {
  //       expiresAt: { [Op.lt]: new Date() }
  //     }
  //   });
  //   console.log(`Cleaned up ${deleted} expired OTP(s)`);
  // },
};
export {
  otpService
};
