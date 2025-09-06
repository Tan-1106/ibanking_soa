import express from "express";
import {
  createFee,
  getFee,
  listFees,
  updateFee,
  deleteFee
} from "../controllers/fee.controller.js";
import validate from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createFeeSchema } from "../schemas/fee.schema.js";

const router = express.Router();

// CRUD for fee types (admin)
router.post("/", validate(createFeeSchema), createFee);
router.get("/", listFees);
router.get("/:id", authMiddleware, getFee);
router.put("/:id", updateFee);
router.delete("/:id", deleteFee);

export default router;