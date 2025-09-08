import axios from "axios";

const OTP_URL = "http://localhost:4004";

export const sendOtp = (userId, email, purpose, token) =>
  axios.post(`${OTP_URL}/otp/send`, { userId, email, purpose }, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);

export const verifyOtp = (userId, code, token) =>
  axios.post(`${OTP_URL}/otp/verify`, { userId, otpCode: code }, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);