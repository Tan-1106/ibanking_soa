import express from "express";
import {
  paymentController
} from "../controllers/payment.controller.js";


import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();
router.post("/",
  authMiddleware,
  paymentController.createPayment
);
router.get("/:paymentId", paymentController.getPayment);
router.get("/", authMiddleware, paymentController.listPayments);
router.get("/confirm/:paymentId", paymentController.confirmPayment);


export default router;