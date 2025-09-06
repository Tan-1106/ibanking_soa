import express from "express";
import {
  createPayment,
  confirmPayment,
  getPayment,
  listPayments,
  cancelPayment
} from "../controllers/payment.controller.js";

import {
  appendPaymentHistory,
  getPaymentHistory,
  queryPaymentHistories
} from "../controllers/paymentHistory.controller.js";

const router = express.Router();

/**
 * Payment flow used by frontend
 */

// Create payment (user clicks Continue -> create pending payment + OTP send)
// - validate payload, require auth, support Idempotency-Key header
router.post("/", 
  /* authMiddleware, idempotencyMiddleware (read Idempotency-Key header), validate(createPaymentSchema) */
  createPayment
);

// Confirm (user submits OTP) -> verify OTP, transaction: deduct balance + mark student_fee paid
router.post("/:paymentId/confirm", 
  /* authMiddleware, validate({ otpCode }) */
  confirmPayment
);

// Get payment status
router.get("/:paymentId", /* authMiddleware */ getPayment);

// List payments (user or admin)
router.get("/", /* authMiddleware (admin or filter by user) */ listPayments);

// Cancel pending payment
router.post("/:paymentId/cancel", /* authMiddleware */ cancelPayment);

/**
 * Payment history (owned by Payment Service)
 * - GET history for a payment (used by admin / audit)
 */
router.get("/payments/:paymentId/history", /* authMiddleware */ getPaymentHistory);
router.get("/payments/history", /* authMiddleware (admin) */ queryPaymentHistories);

// Internal: append history (service-to-service or internal calls) 
router.post("/:paymentId/history", /* ServiceAuthMiddleware */ appendPaymentHistory);

export default router;