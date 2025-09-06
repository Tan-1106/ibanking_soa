import express from "express";
import {
  createStudent,
  getStudentByMssv,
  updateStudent,
  deleteStudent,
  getFeesForStudent,
  assignFeesToStudent,
  updateStudentFee,
  getStudentFeeById
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
// Get fees for student (used by frontend screen 2)
router.get("/:mssv/fees", getFeesForStudent);

// Assign fee(s) to student
router.post("/:mssv/fees", validate(payload), assignFeesToStudent);

// Update a particular student_fee
router.put("/:mssv/fees/:studentFeeId", updateStudentFee);

// Optional: get student_fee by id
router.get("/fees/id/:studentFeeId", authMiddleware, getStudentFeeById);

export default router;