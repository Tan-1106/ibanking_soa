import * as yup from "yup";

// Tạo fee
export const createFeeSchema = yup.object({
  type: yup.string().required().max(32),
  amount: yup.number().required().min(0),
  description: yup.string().max(256),
});

// Gán phí cho student
export const assignFeesSchema = yup.object({
  fees: yup.array().of(
    yup.object({
      feeId: yup.string().required(),
      amount: yup.number().required().min(0),
      dueDate: yup.date().required(),
    })
  ).required(),
});

// Cập nhật student_fee
export const updateStudentFeeSchema = yup.object({
  amount: yup.number().min(0),
  status: yup.string().oneOf(["pending", "paid", "overdue"]),
  paidDate: yup.date(),
}).noUnknown();