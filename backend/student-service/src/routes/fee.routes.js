import express from "express";
import {
  feeController
} from "../controllers/fee.controller.js";
import validate from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createFeeSchema } from "../schemas/fee.schema.js";

const router = express.Router();

// CRUD for fee types (admin)
router.post("/", validate(createFeeSchema), feeController.createFee);
router.get("/", feeController.listFees);
router.get("/:id", authMiddleware, feeController.getFee);
router.put("/:id", feeController.updateFee);
router.delete("/:id", feeController.deleteFee);

export default router;