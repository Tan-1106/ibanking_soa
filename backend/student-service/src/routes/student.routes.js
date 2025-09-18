import express from "express";
import {
  createStudent,
  getStudentByMssv,
  updateStudent,
  deleteStudent,
  getFeesForStudent,
  assignFeesToStudent,
  updateStudentFee,
  getStudentFeeById,
  getStudentFeesByIds,
  markFeesPaid,
  searchTuitionByMssv,
} from "../controllers/student.controller.js";
import { createStudentSchema } from "../schemas/student.schema.js";
import { assignFeesSchema as payload } from "../schemas/fee.schema.js";
import validate from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Student CRUD
 */
router.post("/", validate(createStudentSchema), createStudent);

// MSSV as primary lookup
router.get("/:mssv", getStudentByMssv);
router.put("/:mssv", updateStudent);
router.delete("/:mssv", deleteStudent);

/**
 * Student fees routes
 */
// Get fees for student (search by mssv thì gọi route này) ***
router.get("/:mssv/fees", getFeesForStudent);
router.get("/search/:mssv", searchTuitionByMssv);

// Assign fee(s) to student
router.post("/:mssv/fees", validate(payload), assignFeesToStudent);

// Update a particular student_fee
router.put("/:mssv/fees/:studentFeeId", updateStudentFee);

// Optional: get student_fee by id for detail view or management
router.get("/fees/id/:studentFeeId", authMiddleware, getStudentFeeById);

// New: Get multiple student_fees by IDs (for payment validation)
router.post("/fees/batch", authMiddleware, getStudentFeesByIds);

router.post("/fees/mark-paid", markFeesPaid); // gọi route này từ payment service để đánh dấu phí đã được thanh toán

export default router;