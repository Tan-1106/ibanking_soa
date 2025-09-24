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
router.get("/:id", studentController.getStudentByID);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

router.get("/tuition/:id", studentController.getTuitionByStudentId);
router.get("/fees/:studentId", studentController.getStudentFeeByStudentId);
router.get("/fees/:studentFeeId", studentController.getStudentFeeById);

router.post("/fees/processing", studentController.markProcessingStudentFees);
router.post("/fees/mark-paid", studentController.markFeesPaid); // gọi route này từ payment service để đánh dấu phí đã được thanh toán
router.post("/fees/:studentId", validate(payload), studentController.assignFeesToStudent);
router.put("/fees/:studentFeeId", studentController.updateStudentFee);


export default router;