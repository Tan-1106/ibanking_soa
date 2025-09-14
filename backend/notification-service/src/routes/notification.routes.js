import express from "express";
import {
  sendInvoice,
  handlePaymentConfirmed
} from "../controllers/notification.controller.js";
import serviceAuth from "../middlewares/serviceAuth.middleware.js";

const router = express.Router();

//router.post("/invoice", sendInvoice);
router.post("/invoice", serviceAuth, sendInvoice);
// notification.routes.js
router.post("/events/payment-confirmed", serviceAuth, handlePaymentConfirmed);


export default router;