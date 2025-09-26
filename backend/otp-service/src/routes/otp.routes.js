import express from "express";
import { otpController } from "../controllers/otp.controller.js";
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post("/send", authMiddleware, otpController.sendPaymentOTP);
router.post("/verify", otpController.verifyOtp);

export default router;