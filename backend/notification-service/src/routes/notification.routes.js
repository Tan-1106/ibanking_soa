import express from "express";
import {
  sendNotification,
  sendInvoice,
  getNotification
} from "../controllers/notification.controller.js";

const router = express.Router();

// Generic send (email/sms) - used internally
router.post("/send", /* ServiceAuthMiddleware */ sendNotification);

// Specialized: send invoice to payer after successful payment
router.post("/send-invoice", /* ServiceAuthMiddleware */ sendInvoice);

// Query notification status
router.get("/:id", /* ServiceAuthMiddleware or authMiddleware */ getNotification);

export default router;