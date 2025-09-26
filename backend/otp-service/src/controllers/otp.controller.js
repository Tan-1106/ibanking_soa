import ApiResponse from "../utils/Api.response.js";
import { otpService } from "../services/otp.service.js";
import ApiError from "../utils/ApiError.js";
import { verify } from "crypto";

const otpController = {
  sendPaymentOTP: async (req, res) => {
    const { userId, paymentId } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new ApiError(401, "Unauthorized", "No token provided");
    }
    const result = await otpService.sendPaymentOTP(userId, paymentId, token);
    res.status(200).json(new ApiResponse(200, "OTP sent successfully", result));
  },
  verifyOtp: async (req, res) => {
    const { userId, paymentId, code } = req.body;
    const result = await otpService.verifyOtp(userId, paymentId, code);
    res.status(200).json(new ApiResponse(200, "OTP verified successfully", result));
  }
};
export { otpController }