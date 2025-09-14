import ApiResponse from "../utils/Api.response.js";
import * as otpService from "../services/otp.service.js";
import ApiError from "../utils/ApiError.js";
// Gửi OTP
export const send = async (req, res) => {
  const { userId, purpose } = req.body;
  const result = await otpService.sendOTP(userId, purpose, req.headers.authorization.split(" ")[1]);
  res.status(200).json(new ApiResponse(200, "OTP sent successfully", result));
};

// Xác minh OTP
export const verify = async (req, res) => {
  const { userId, otpCode } = req.body;
  const result = await otpService.verifyOtp(userId, otpCode);

  if (!result.success) {
    throw new ApiError(400, "OTP Error", "OTP verification failed");
  }
  res.status(200).json(new ApiResponse(200, "OTP verified successfully", result));
};