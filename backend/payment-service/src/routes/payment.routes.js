import express from "express";
import {
  paymentController
} from "../controllers/payment.controller.js";


import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();
/**
 * Payment 
 */
// Create payment (user clicks Continue -> create pending payment + OTP send)
router.post("/",
  authMiddleware,
  paymentController.createPayment
);


// Get payment status
router.get("/:paymentId", authMiddleware, paymentController.getPayment);

// List payments (user or admin)
router.get("/", authMiddleware, paymentController.listPayments);

// Cancel pending payment
router.post("/:paymentId/cancel", authMiddleware, paymentController.cancelPayment);


export default router;