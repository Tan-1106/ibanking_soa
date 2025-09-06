import * as yup from "yup";

// Đăng ký
export const registerSchema = yup.object({
  username: yup.string().required().min(4).max(32),
  password: yup.string().required().min(6).max(128),
  fullName: yup.string().required().max(64),
  email: yup.string().required().email(),
});

// Đăng nhập
export const loginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(128),
});

// Cập nhật thông tin user
export const updateUserSchema = yup.object({
  username: yup.string().min(4).max(32),
  fullName: yup.string().max(64),
  email: yup.string().email(),
  password: yup.string().min(6).max(128),
}).noUnknown();