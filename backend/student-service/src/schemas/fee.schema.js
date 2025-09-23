import * as yup from "yup";

// Tạo fee
export const createFeeSchema = yup.object({
  subject: yup.string().max(256),
  amount: yup.number().required().min(0),
  semester: yup.number().required().min(1),
  year: yup.number().required().min(2000),
});

// Gán phí cho student
export const assignFeesSchema = yup.object({
  feeIds: yup.array().of(
    yup.number().required())
});

// Cập nhật student_fee
export const updateStudentFeeSchema = yup.object({
  amount: yup.number().min(0),
  status: yup.string().oneOf(["pending", "paid", "overdue"]),
  paidDate: yup.date(),
}).noUnknown();