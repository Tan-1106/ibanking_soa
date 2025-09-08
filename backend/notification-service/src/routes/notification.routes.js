import express from "express";
import {
  sendInvoice
} from "../controllers/notification.controller.js";
import serviceAuth from "../middlewares/serviceAuth.middleware.js";

const router = express.Router();

router.post("/invoice", serviceAuth, sendInvoice);

export default router;