import express from "express";
import {
  sendInvoice
} from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/invoice", sendInvoice);


export default router;