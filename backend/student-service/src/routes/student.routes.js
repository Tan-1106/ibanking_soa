import express from "express";
import { createStudentSchema } from "../schemas/student.schema.js";
import { assignFeesSchema as payload } from "../schemas/fee.schema.js";
import validate from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { studentController } from "../controllers/student.controller.js";

const router = express.Router();

/**
 * Student CRUD
 */

router.post("/", validate(createStudentSchema), studentController.createStudent);

// studentId as primary lookup
router.get("/:id", studentController.getStudentByID);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

/**
 * Student fees routes
 */
//!
// Get fees for student (search by sID thì gọi route này) ***
router.get("/tuition/:id", studentController.getTuitionByStudentId);

router.get("/fees/:studentFeeId", authMiddleware, studentController.getStudentFeeById);
router.post("/fees/mark-paid", studentController.markFeesPaid); // gọi route này từ payment service để đánh dấu phí đã được thanh toán

// Assign fee(s) to student
router.post("/fees/:studentId", validate(payload), studentController.assignFeesToStudent);
// Update a particular student_fee
router.put("/fees/:studentFeeId", studentController.updateStudentFee);


export default router;