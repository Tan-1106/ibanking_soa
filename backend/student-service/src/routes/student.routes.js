import express from "express";
import {
  createStudent,
  getStudentBySID,
  updateStudent,
  deleteStudent,
  getFeesForStudent,
  assignFeesToStudent,
  updateStudentFee,
  getStudentFeeById,
  getStudentFeesByIds,
  markFeesPaid,
  searchTuitionBySID,
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

// SID as primary lookup
router.get("/:sID", getStudentBySID);
router.put("/:sID", updateStudent);
router.delete("/:sID", deleteStudent);

/**
 * Student fees routes
 */
// Get fees for student (search by sID thì gọi route này) ***
router.get("/:sID/fees", getFeesForStudent);
router.get("/search/:sID", searchTuitionBySID);

// Assign fee(s) to student
router.post("/:sID/fees", validate(payload), assignFeesToStudent);

// Update a particular student_fee
router.put("/:sID/fees/:studentFeeId", updateStudentFee);

// Optional: get student_fee by id for detail view or management
router.get("/fees/id/:studentFeeId", authMiddleware, getStudentFeeById);

// New: Get multiple student_fees by IDs (for payment validation)
router.post("/fees/batch", authMiddleware, getStudentFeesByIds);

router.post("/fees/mark-paid", markFeesPaid); // gọi route này từ payment service để đánh dấu phí đã được thanh toán

export default router;