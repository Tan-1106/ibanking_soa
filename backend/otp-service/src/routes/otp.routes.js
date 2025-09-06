import express from "express";
import {
  sendOTP,
  verifyOTP,
  getOTP // optional for admin/debug
} from "../controllers/otp.controller.js";

const router = express.Router();

// Send OTP (called by PaymentService after create payment)
// - protect with ServiceAuth or allow PaymentService to call (ServiceAuth)
router.post("/send", /* ServiceAuthMiddleware or authMiddleware */ sendOTP);

// Verify OTP (can be called by PaymentService or PaymentService calls local model)
router.post("/verify", /* ServiceAuthMiddleware or authMiddleware */ verifyOTP);

// Optional: get OTP record (admin/debug only)
router.get("/:id", /* authMiddleware (admin) */ getOTP);

export default router;