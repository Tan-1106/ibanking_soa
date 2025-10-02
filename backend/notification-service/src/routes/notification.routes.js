import express from "express";
import {
  handlePaymentConfirmed,
  sendInvoice
} from "../controllers/notification.controller.js";

const router = express.Router();

//router.post("/invoice", sendInvoice);
router.post("/invoice", sendInvoice);
// notification.routes.js
router.post("/events/payment-confirmed", handlePaymentConfirmed);


export default router;