import * as yup from "yup";


// Xác nhận OTP
export const confirmPaymentSchema = yup.object({
  otpCode: yup.string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required(),
});