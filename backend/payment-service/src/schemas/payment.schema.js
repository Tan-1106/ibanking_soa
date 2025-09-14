import * as yup from "yup";

// Tạo payment
export const createPaymentSchema = yup.object({
  userId: yup.string().required(),
  amount: yup.number().required().min(0),
  method: yup.string().required().oneOf(["bank", "momo", "cash"]),
  status: yup.string().required().oneOf(["pending", "completed", "cancelled"]),
});

// Xác nhận OTP
export const confirmPaymentSchema = yup.object({
  otpCode: yup.string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required(),
});