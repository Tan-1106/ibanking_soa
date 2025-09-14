import express from "express";
import {
  createPayment,
  confirmPayment,
  getPayment,
  listPayments,
  cancelPayment
} from "../controllers/payment.controller.js";

import {
  getPaymentHistory,
  queryPaymentHistories,
  appendPaymentHistory
} from "../controllers/paymentHistory.controller.js";

import authMiddleware from '../middlewares/auth.middleware.js';
import idempotencyMiddleware from '../middlewares/idempotency.middleware.js';
import ServiceAuthMiddleware from '../middlewares/serviceAuth.middleware.js';
import validate from '../middlewares/validate.middleware.js';
import { createPaymentSchema } from '../schemas/payment.schema.js';

const router = express.Router();


/**
 * Payment 
 */
// Create payment (user clicks Continue -> create pending payment + OTP send)
router.post("/", 
  authMiddleware, idempotencyMiddleware, 
  //validate(createPaymentSchema),
  createPayment
);

// Confirm (user submits OTP) -> verify OTP, transaction: deduct balance + mark student_fee paid
router.post("/:paymentId/confirm", 
  authMiddleware,
  confirmPayment
);

// Get payment status
router.get("/:paymentId", authMiddleware, getPayment);

// List payments (user or admin)
router.get("/", authMiddleware, listPayments);

// Cancel pending payment
router.post("/:paymentId/cancel", authMiddleware, cancelPayment);

/**
 * Payment history
 */
router.get("/payments/:paymentId/history", authMiddleware, getPaymentHistory);
router.get("/payments/history", authMiddleware, queryPaymentHistories);

// Internal: append history (service-to-service or internal calls) 
router.post("/:paymentId/history", ServiceAuthMiddleware, appendPaymentHistory);

export default router;