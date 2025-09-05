import * as otpService from "../services/otp.service.js";

// Gửi OTP
export const send = async (req, res) => {
  try {
    const { userId, purpose } = req.body;
    const result = await otpService.sendOTP(userId, purpose);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Xác minh OTP
export const verify = async (req, res) => {
  try {
    const { userId, otpCode } = req.body;
    const result = await otpService.verifyOtp(userId, otpCode);

    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.json(result);
  } catch (err) {
    console.error("OTP verify error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};