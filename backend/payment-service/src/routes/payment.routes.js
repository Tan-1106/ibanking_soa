import express from "express";
import { paymentController } from "../controllers/payment.controller.js";
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();
router.post("/", authMiddleware, paymentController.createPayment);
router.get("/", authMiddleware, paymentController.listPayments);
router.get("/histories", authMiddleware, paymentController.getPaymentHistories);
router.get("/:paymentId", paymentController.getPayment);
router.get("/confirm/:paymentId", paymentController.confirmPayment);
router.get("/check-in-transaction/:studentId", authMiddleware, paymentController.isInTransaction);
export default router;