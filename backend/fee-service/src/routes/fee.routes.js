import express from "express";
import { getFeeById, getFee, registerFee, updateFee, deleteFee } from "../controllers/fee.controller.js";

const router = express.Router();

router.post("/", registerFee);
router.get("/", getFee);
router.get("/:id", getFeeById);
router.put("/:id", updateFee);
router.delete("/:id", deleteFee);

export default router;