import express from "express";
import {
  send,
  verify
} from '../controllers/otp.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

// Send OTP (called by PaymentService after create payment)
router.post("/send", authMiddleware, send);

// Verify OTP (can be called by PaymentService or PaymentService calls local model)
router.post("/verify", authMiddleware, verify);

export default router;