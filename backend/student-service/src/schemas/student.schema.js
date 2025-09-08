import * as yup from "yup";

// Tạo student
export const createStudentSchema = yup.object({
  mssv: yup.string().required().min(6).max(12),
  fullName: yup.string().required().max(64),
  email: yup.string().required().email(),
  dob: yup.date().required(),
  class: yup.string().required().max(16),
});

// Cập nhật student
export const updateStudentSchema = yup.object({
  fullName: yup.string().max(64),
  email: yup.string().email(),
  dob: yup.date(),
  class: yup.string().max(16),
}).noUnknown();