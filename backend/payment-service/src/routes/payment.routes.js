import express from "express";
import {
  cancelPayment,
  createPayment,
  getPayment,
  listPayments
} from "../controllers/payment.controller.js";


import authMiddleware from '../middlewares/auth.middleware.js';
import idempotencyMiddleware from '../middlewares/idempotency.middleware.js';

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


// Get payment status
router.get("/:paymentId", authMiddleware, getPayment);

// List payments (user or admin)
router.get("/", authMiddleware, listPayments);

// Cancel pending payment
router.post("/:paymentId/cancel", authMiddleware, cancelPayment);


export default router;