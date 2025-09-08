import express from "express";
import * as otpService from "../services/otp.service.js";
import * as paymentService from "../services/payment.service.js";
import * as userService from "../services/user.service.js";
import * as studentService from "../services/student.service.js";
import * as notificationService from "../services/notification.service.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Step 1: create payment + send otp
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const { studentFeeIds, purpose, email } = req.body;
    const userId = req.user.id;

    // 1. create payment
    const payment = await paymentService.createPayment({ studentFeeIds, userId }, token);

    // 2. send otp
    await otpService.sendOtp(userId, email, purpose || "payment", token);

    res.json({ message: "Payment created, OTP sent", payment });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Step 2: verify otp and confirm payment
router.post("/verify", authMiddleware, async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const { paymentId, otpCode, amount, studentFeeIds } = req.body;
    const userId = req.user.id;

    // 1. verify otp
    const otpResult = await otpService.verifyOtp(userId, otpCode, token);
    if (!otpResult.success) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // 2. deduct user balance
    await userService.deductBalance(userId, amount, token);

    // 3. update student fee status
    for (const feeId of studentFeeIds) {
      await studentService.updateStudentFee(feeId, { status: "paid" }, token);
    }

    // 4. confirm payment
    const confirmed = await paymentService.confirmPayment(paymentId, token);

    // 5. save payment history
    await paymentService.saveHistory({ paymentId, userId, amount, status: "success" }, token);

    // 6. send invoice
    await notificationService.sendInvoice({ payment: confirmed, items: confirmed.items, to: req.user.email }, token);

    res.json({ message: "Payment verified successfully", payment: confirmed });
  } catch (err) {
    console.error("Verify error:", err);
    res.status(400).json({ error: err.message });
  }
});

export default router;